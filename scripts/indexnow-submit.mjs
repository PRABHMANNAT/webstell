#!/usr/bin/env node

/**
 * Manually notify IndexNow about changed production URLs.
 *
 * Usage:
 *   npm run indexnow:submit
 *   npm run indexnow:submit -- https://webstell-studio.com/contact
 *
 * With no URL arguments, this submits the current canonical production URL set.
 * The public key file is verified before any IndexNow request is sent.
 */

const host = 'webstell-studio.com';
const key = '39c1e8e09ec17a7ece6a5b9dc2120940';
const keyLocation = `https://${host}/${key}.txt`;

const currentUrls = [
  `https://${host}/`,
  `https://${host}/services`,
  `https://${host}/projects`,
  `https://${host}/pricing`,
  `https://${host}/about`,
  `https://${host}/contact`,
  `https://${host}/schedule`,
  `https://${host}/privacy`,
  `https://${host}/terms`,
  `https://${host}/cookies`,
  `https://${host}/refunds`,
  `https://${host}/accessibility`,
  `https://${host}/insights`,
  `https://${host}/insights/how-much-does-a-website-cost-in-india`,
  `https://${host}/insights/how-long-does-it-take-to-build-a-business-website`,
  `https://${host}/insights/website-vs-custom-software`,
];

function validateUrls(urls) {
  if (urls.length === 0) {
    throw new Error('Provide at least one production URL.');
  }

  const uniqueUrls = [...new Set(urls)];
  if (uniqueUrls.length !== urls.length) {
    throw new Error('Duplicate URLs are not allowed.');
  }

  for (const value of urls) {
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error(`Malformed URL: ${value}`);
    }

    if (url.protocol !== 'https:' || url.hostname !== host || url.username || url.password || url.hash) {
      throw new Error(`URL must be an HTTPS URL on ${host}: ${value}`);
    }
  }

  return urls;
}

async function verifyKeyFile() {
  const response = await fetch(keyLocation, { redirect: 'error' });
  if (!response.ok) {
    throw new Error(`IndexNow key file is not live (${response.status} ${response.statusText}): ${keyLocation}`);
  }

  const body = await response.text();
  if (body.trim() !== key) {
    throw new Error(`IndexNow key file content does not match the configured key: ${keyLocation}`);
  }
}

async function submit(urlList) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`IndexNow submission failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ''}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URL${urlList.length === 1 ? '' : 's'} (${response.status}).`);
}

const requestedUrls = process.argv.slice(2);
const urlList = validateUrls(requestedUrls.length > 0 ? requestedUrls : currentUrls);

await verifyKeyFile();
await submit(urlList);
