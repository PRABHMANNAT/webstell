'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Original scene. Texture provenance: docs/earth-texture.md. */
export default function EnquiryEarth({
  rotation,
  sent,
  reduced,
}: {
  rotation: number;
  sent: boolean;
  reduced: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef({ rotation, sent });
  useEffect(() => {
    controls.current = { rotation, sent };
  }, [rotation, sent]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.z = 4.3;
    const sphere = new THREE.SphereGeometry(1, 64, 48);
    const material = new THREE.MeshPhongMaterial({
      shininess: 8,
      specular: '#37566a',
    });
    const earth = new THREE.Mesh(sphere, material);
    scene.add(earth);
    let disposed = false,
      dirty = true;
    const texture = new THREE.TextureLoader().load(
      '/assets/earth-daymap.jpg',
      (map) => {
        if (disposed) {
          map.dispose();
          return;
        }
        map.colorSpace = THREE.SRGBColorSpace;
        material.map = map;
        material.needsUpdate = true;
        dirty = true;
        container.dataset.ready = 'true';
      },
    );
    scene.add(new THREE.AmbientLight('#b4c9dc', 1.1));
    const sun = new THREE.DirectionalLight('#fff4db', 2.4);
    sun.position.set(-3, 3, 4);
    scene.add(sun);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      vertexShader:
        'varying vec3 n; varying vec3 v; void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',
      fragmentShader:
        'varying vec3 n; varying vec3 v; void main(){float a=pow(1.-abs(dot(normalize(n),normalize(v))),3.);gl_FragColor=vec4(.35,.64,.75,a*.3);}',
    });
    const atmosphere = new THREE.Mesh(sphere, atmosphereMaterial);
    atmosphere.scale.setScalar(1.02);
    scene.add(atmosphere);
    const point = (t: number) => {
      const angle = t * Math.PI * 2 + 0.18;
      const lat = 0.22 + Math.sin(t * Math.PI * 2 + 1.2) * 0.4;
      const radius = 1.08 + Math.sin(t * Math.PI) * 0.2;
      return new THREE.Vector3(
        Math.sin(angle) * Math.cos(lat),
        Math.sin(lat),
        Math.cos(angle) * Math.cos(lat),
      ).multiplyScalar(radius);
    };
    const trailGeometry = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 241 }, (_, i) => point(i / 240)),
    );
    const trailMaterial = new THREE.LineBasicMaterial({
      color: '#d7ff46',
      transparent: true,
      opacity: 0.8,
    });
    const trail = new THREE.Line(trailGeometry, trailMaterial);
    scene.add(trail);
    const planeGeometry = new THREE.BufferGeometry();
    planeGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        [
          0, 0.15, 0, -0.11, -0.1, 0, 0, -0.04, 0.045, 0, 0.15, 0, 0, -0.04,
          0.045, 0.11, -0.1, 0, 0, -0.04, 0.045, 0, -0.12, 0, 0.11, -0.1, 0,
        ],
        3,
      ),
    );
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: '#e5ff96',
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    const pinGeometry = new THREE.SphereGeometry(0.035, 16, 12);
    const pinMaterial = new THREE.MeshBasicMaterial({ color: '#d7ff46' });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.position.copy(point(1));
    scene.add(pin);
    const haloGeometry = new THREE.RingGeometry(0.06, 0.075, 40);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: '#d7ff46',
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.position.copy(point(1).multiplyScalar(1.015));
    scene.add(halo);
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      dirty = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    let visible = false;
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    intersection.observe(container);
    let frame = 0,
      started = 0,
      wasSent = false,
      lastRotation = NaN,
      lastProgress = -1;
    const axis = new THREE.Vector3(0, 1, 0);
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      if (!visible) return;
      const state = controls.current;
      if (state.sent !== wasSent) {
        started = now;
        dirty = true;
      }
      wasSent = state.sent;
      const progress = state.sent
        ? reduced
          ? 1
          : THREE.MathUtils.clamp(((now - started) / 1000 - 0.65) / 4.2, 0, 1)
        : 0;
      if (
        !dirty &&
        lastRotation === state.rotation &&
        lastProgress === progress
      )
        return;
      dirty = false;
      lastRotation = state.rotation;
      lastProgress = progress;
      earth.rotation.y = THREE.MathUtils.degToRad(state.rotation);
      trail.visible = state.sent;
      trailGeometry.setDrawRange(0, Math.floor(progress * 240) + 1);
      plane.visible = state.sent && progress > 0 && progress < 1;
      plane.position.copy(point(progress));
      const tangent = point(Math.min(progress + 0.002, 1))
        .sub(point(Math.max(progress - 0.002, 0)))
        .normalize();
      plane.quaternion.setFromUnitVectors(axis, tangent);
      pin.visible = halo.visible = state.sent && progress === 1;
      container.dataset.arrived = String(pin.visible);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      texture.dispose();
      sphere.dispose();
      material.dispose();
      atmosphereMaterial.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      pinGeometry.dispose();
      pinMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete container.dataset.ready;
      delete container.dataset.arrived;
    };
  }, [reduced]);
  return (
    <div ref={host} className="enquiry-earth" aria-hidden="true">
      <div className="enquiry-earth-fallback" />
      <span className="enquiry-earth-arrival">Received by WEBSTELL</span>
    </div>
  );
}
