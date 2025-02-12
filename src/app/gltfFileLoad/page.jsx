"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function GltfFileLoad() {
  const carRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    //const scene = new THREE.Scene();
    const scene = sceneRef.current;

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
    scene.add(camera);
    cameraRef.current = camera;

    // Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Grid
    const grid = new THREE.GridHelper(30, 30);
    scene.add(grid);

    // Color encoding and tone mapping
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 4;

    //Load HDR environment texture
    const rgbeLoader = new RGBELoader();
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
          //car = model;
          carRef.current = model;
        });
      }
    );

    // Animation Loop
    function animate(time) {
      if (carRef.current) {
        carRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
    //renderer.setAnimationLoop(animate);

    // Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on Unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  // Rotate Model on Button Click
  const rotateModel = () => {
    if (carRef.current) carRef.current.rotation.y += Math.PI / 4;
  };

  return (
    <div>
      <button
        onClick={rotateModel}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Rotate Model
      </button>
    </div>
  );
}
