"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function PanoramicScene() {
  useEffect(() => {
    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Add VR Button
    document.body.appendChild(VRButton.createButton(renderer));

    // Scene and Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    scene.add(camera);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Panoramic Sphere
    const panoSphereGeo = new THREE.SphereGeometry(6, 256, 256);
    const panoMat = new THREE.MeshStandardMaterial({
      side: THREE.BackSide,
      displacementScale: -0.4,
    });

    const pano = new THREE.Mesh(panoSphereGeo, panoMat);
    scene.add(pano);

    // Texture Loader
    const loader = new THREE.TextureLoader();

    loader.load("/panoramic/kandao3.jpg", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      pano.material.map = texture;
      pano.material.needsUpdate = true;
    });

    loader.load("/panoramic/kandao3_depthmap.jpg", (depth) => {
      pano.material.displacementMap = depth;
      pano.material.needsUpdate = true;
    });

    // Animation Loop
    const animate = () => {
      pano.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // Handle Resizing
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      renderer.setAnimationLoop(null);
      document.body.removeChild(renderer.domElement);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
