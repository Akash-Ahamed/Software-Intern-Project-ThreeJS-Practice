"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function GlbFilesLoadScene() {
  useEffect(() => {
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Scene and Camera
    const scene = new THREE.Scene();
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-90, 140, 140);

    // Camera Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.update();

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Load GLB File
    const assetLoader = new GLTFLoader();
    assetLoader.load(
      "/glb_files/iphone.glb",
      function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(-12, 4, 10);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    // Light (Ambient)
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });
}
