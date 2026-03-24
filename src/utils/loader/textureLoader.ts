import * as THREE from 'three';
import type { LoadingManager } from './loadingManager';
import { loadingManager } from './loadingManager';

export class TextureLoaderService {
  private readonly loader: THREE.TextureLoader;

  constructor(manager: LoadingManager) {
    this.loader = new THREE.TextureLoader(manager.three);
  }

  load(path: string): THREE.Texture {
    return this.loader.load(path);
  }
}

export const textureLoader = new TextureLoaderService(loadingManager);
