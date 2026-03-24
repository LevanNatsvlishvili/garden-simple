import * as THREE from 'three';
import { config } from '@/config/config';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(config.renderer.clearColor);

export const canvas = document.querySelector<HTMLCanvasElement>('.webgl')!;

export const camera = new THREE.PerspectiveCamera(
  config.camera.fov,
  window.innerWidth / window.innerHeight,
  config.camera.near,
  config.camera.far,
);
camera.position.set(
  config.camera.position.x,
  config.camera.position.y,
  config.camera.position.z,
);
camera.lookAt(0, 0, 0);

export const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(config.renderer.pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
