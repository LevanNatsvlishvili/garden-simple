import * as THREE from 'three';
import { AssetCreator } from './assetCreator';
import { PlantStatus } from '@/types';
import type { PlantConfig } from '@/types';
import { textureLoader } from '@/utils/loader/textureLoader';

export class Plant extends AssetCreator {
  private status: PlantStatus;
  private readonly config: PlantConfig;
  private readonly textures: Map<PlantStatus, THREE.Texture> = new Map();
  private readonly sprite: THREE.Sprite;

  constructor(config: PlantConfig, x: number, z: number) {
    const material = new THREE.SpriteMaterial({ transparent: true });
    const sprite = new THREE.Sprite(material);

    sprite.scale.set(config.scale, config.scale, 1);
    sprite.position.set(x, config.scale / 2, z);

    super(sprite);

    this.config = config;
    this.sprite = sprite;
    this.status = PlantStatus.growing;

    this.loadTextures();
  }

  private loadTextures() {
    for (const status of Object.values(PlantStatus) as PlantStatus[]) {
      const path = this.config.textures[status];
      const texture = textureLoader.load(path);
      this.textures.set(status, texture);
    }
    this.applyTexture();
  }

  private applyTexture() {
    const texture = this.textures.get(this.status);
    if (texture) {
      this.sprite.material.map = texture;
      this.sprite.material.needsUpdate = true;
    }
  }

  getStatus(): PlantStatus {
    return this.status;
  }

  setStatus(status: PlantStatus) {
    this.status = status;
    this.applyTexture();
  }

  water() {
    if (this.status === PlantStatus.growing) {
      this.setStatus(PlantStatus.ripe);
    }
  }
}
