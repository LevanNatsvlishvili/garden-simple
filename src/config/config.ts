import { PlantStatus } from '@/types';
import type { PlantConfig, Vector2D } from '@/types';

export const config = {
  camera: {
    fov: 10.5,
    position: { x: 10, y: 9, z: 10 },
    near: 0.1,
    far: 100,
  },

  renderer: {
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    clearColor: 0x87ceeb,
  },

  lights: {
    ambient: { color: 0xffffff, intensity: 4 },
    directional: {
      color: 0xffffff,
      intensity: 1,
      position: { x: -1.5, y: 2, z: -8 },
    },
  },

  ground: {
    size: 6,
    color: 0x4a8c3f,
    positionY: 0,
  },
};

const plantPositions = [
  { x: -0.4, z: 0.3 },
  { x: 0.0, z: 0.1 },
  { x: 0.4, z: 0.3 },
] as readonly Vector2D[];

export const assetConfig = {
  tomato: {
    name: 'Tomato',
    textures: {
      [PlantStatus.growing]: '/sprites/tomato/growing.png',
      [PlantStatus.ripe]: '/sprites/tomato/ripe.png',
    },
    scale: 0.4,
  } as PlantConfig,

  plantPositions: plantPositions,
};
