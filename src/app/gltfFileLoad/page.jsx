"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function GltfFileLoad() {
  useEffect(() => {
    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Set camera position
    camera.position.set(6, 6, 6);
    renderer.setClearColor(0xa3a3a3);

    // Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.update();

    //Grid
    const grid = new THREE.GridHelper(30, 30);
    scene.add(grid);

    //
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 4;

    //Load HDR environment
    const rgbeLoader = new RGBELoader();
    let car;
    rgbeLoader.load(
      "/gltf_files/MR_INT-005_WhiteNeons_NAD.hdr",
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;

        // Load the GLTF Model
        const gltfLoader = new GLTFLoader();
        gltfLoader.load("/gltf_files/scene.gltf", (gltf) => {
          const model = gltf.scene;
          scene.add(model);
          car = model;
        });
      }
    );

    // Animation Loop
    function animate(time) {
      if (car) car.rotation.y = -time / 3000;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // Cleanup on Unmount
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}
