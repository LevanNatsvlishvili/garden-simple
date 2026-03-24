import * as THREE from 'three';
import { AssetCreator } from './assetCreator';
import { config } from '@/config/config';

export class Ground extends AssetCreator {
  constructor() {
    const geometry = new THREE.PlaneGeometry(config.ground.size, config.ground.size);
    const material = new THREE.MeshStandardMaterial({
      color: config.ground.color,
      roughness: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = config.ground.positionY;
    mesh.receiveShadow = true;

    super(mesh);
  }
}
