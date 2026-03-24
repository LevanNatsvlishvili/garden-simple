import * as THREE from 'three';

export abstract class AssetCreator {
  protected object3D: THREE.Object3D;

  constructor(object3D: THREE.Object3D) {
    this.object3D = object3D;
  }

  get position(): THREE.Vector3 {
    return this.object3D.position;
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.object3D);
  }

  update(_delta: number) {}
}
