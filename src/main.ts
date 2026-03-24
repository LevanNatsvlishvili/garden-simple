import './style.css';
import * as THREE from 'three';
import { scene, camera, renderer } from '@/utils/renderer';
import { pixiApp } from '@/ui/pixiApp';
import { setupScene } from '@/scene/setup';
import { GrowingState } from '@/state/states';
import state from '@/store/state';

const clock = new THREE.Clock();

async function init() {
  await pixiApp.init();

  setupScene();

  state.stateManager.transition(new GrowingState());

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    pixiApp.resize();
    state.ui.layout();
  });

  const tick = () => {
    requestAnimationFrame(tick);

    const delta = clock.getDelta();
    state.stateManager.update(delta);

    for (const plant of state.plants) {
      plant.update(delta);
    }

    renderer.render(scene, camera);
  };

  requestAnimationFrame(tick);
}

init().catch((err) => console.error('init failed:', err));
