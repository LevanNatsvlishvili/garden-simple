import * as THREE from 'three';
import { scene } from '@/utils/renderer';
import { config, assetConfig } from '@/config/config';
import { Ground } from '@/assets/ground';
import { Plant } from '@/assets/plant';
import state from '@/store/state';

export function setupScene() {
  const ground = new Ground();
  ground.addToScene(scene);

  // Plants placement
  for (const pos of assetConfig.plantPositions) {
    const plant = new Plant(assetConfig.tomato, pos.x, pos.z);
    plant.addToScene(scene);
    state.plants.push(plant);
  }

  const ambientLight = new THREE.AmbientLight(
    config.lights.ambient.color,
    config.lights.ambient.intensity
  );
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(
    config.lights.directional.color,
    config.lights.directional.intensity
  );
  directionalLight.position.set(
    config.lights.directional.position.x,
    config.lights.directional.position.y,
    config.lights.directional.position.z
  );
  scene.add(directionalLight);
}

export default setupScene;
