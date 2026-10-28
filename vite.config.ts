import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig, type ViteDevServer } from 'vite';
import hostingConfig from './.openai/hosting.json';
import { regionalHome, resolveRegion } from './lib/region';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

const localBindingConfig = {
  main: 'vinext/server/fetch-handler',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

export default defineConfig(async () => {
  const isVercelBuild = process.env.VERCEL === '1';

  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  // Vercel serves the static export directly, so its build does not need the
  // Cloudflare preview/runtime plugins.
  const cloudflarePlugins = isVercelBuild
    ? []
    : [
        sites(),
        (await import('@cloudflare/vite-plugin')).cloudflare({
          viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
          config: localBindingConfig,
        }),
      ];

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      {
        name: 'webstell-regional-home',
        configureServer(server: ViteDevServer) {
          server.middlewares.use((request, response, next) => {
            const url = new URL(request.url || '/', 'http://localhost');
            const headers = new Headers();
            for (const [key, value] of Object.entries(request.headers))
              if (value)
                headers.set(
                  key,
                  Array.isArray(value) ? value.join(';') : value,
                );
            if (
              url.pathname === '/api/region' &&
              (request.method === 'GET' || request.method === 'HEAD')
            ) {
              response.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'private, no-store',
                Vary: 'Cookie, X-Vercel-IP-Country',
              });
              response.end(
                request.method === 'HEAD'
                  ? undefined
                  : JSON.stringify(resolveRegion(headers)),
              );
              return;
            }
            const target = regionalHome(url, headers);
            if (
              target &&
              (request.method === 'GET' || request.method === 'HEAD')
            ) {
              response.writeHead(307, {
                Location: target,
                'Cache-Control': 'private, no-store',
              });
              response.end();
              return;
            }
            next();
          });
        },
      },
      vinext(),
      ...cloudflarePlugins,
    ],
  };
});
