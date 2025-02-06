"use client";
import * as THREE from "three";
import { useEffect } from "react";

export default function FirstScene() {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    camera.position.set(0, 2, 5);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff8000 });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    function animate(time) {
      box.rotation.x = time / 1000;
      box.rotation.y = time / 1000;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });
}
