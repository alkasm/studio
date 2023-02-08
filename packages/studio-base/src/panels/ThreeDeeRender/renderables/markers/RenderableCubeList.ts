// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import * as THREE from "three";

import { createGeometry as createCubeGeometry } from "./RenderableCube";
import { RenderableMarker } from "./RenderableMarker";
import { markerHasTransparency, makeStandardInstancedMaterial } from "./materials";
import { DynamicInstancedMesh } from "../../DynamicInstancedMesh";
import type { Renderer } from "../../Renderer";
import { disposeMeshesRecursive } from "../../dispose";
import { Marker } from "../../ros";

export class RenderableCubeList extends RenderableMarker {
  private mesh: DynamicInstancedMesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  // outline: THREE.LineSegments | undefined;

  public constructor(
    topic: string,
    marker: Marker,
    receiveTime: bigint | undefined,
    renderer: Renderer,
  ) {
    super(topic, marker, receiveTime, renderer);

    // Cube instanced mesh
    const material = makeStandardInstancedMaterial(marker);
    const geometry = renderer.sharedGeometry.getGeometry("RenderableCube", createCubeGeometry);
    this.mesh = new DynamicInstancedMesh(geometry, material, marker.points.length);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.add(this.mesh);

    this.update(marker, receiveTime);
  }

  public override dispose(): void {
    disposeMeshesRecursive(this.mesh);
    super.dispose();
  }

  public override update(newMarker: Marker, receiveTime: bigint | undefined): void {
    const prevMarker = this.userData.marker;
    super.update(newMarker, receiveTime);
    const marker = this.userData.marker;

    const transparent = markerHasTransparency(marker);
    if (transparent !== markerHasTransparency(prevMarker)) {
      this.mesh.material.transparent = transparent;
      this.mesh.material.depthWrite = !transparent;
      this.mesh.material.needsUpdate = true;
    }

    this.mesh.set(marker.points, marker.scale, marker.colors, marker.color);
  }
}
