"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ObectRotateScene() {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Camera Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    camera.position.set(-90, 140, 140);
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    orbitControls.update();

    //
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const cubeTexture = cubeTextureLoader.load([
      "/planet/stars.jpg",
      "/planet/stars.jpg",
      "/planet/stars.jpg",
      "/planet/stars.jpg",
      "/planet/stars.jpg",
      "/planet/stars.jpg",
    ]);
    scene.background = cubeTexture;

    // Set Image
    const textureLoader = new THREE.TextureLoader();

    // Sun Obect (Parent object)
    const sunGeo = new THREE.SphereGeometry(16, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load("/planet/sun.jpg"),
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Mercury Obect (Child object)
    const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
    const mercuryMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load("/planet/mercury.jpg"),
    });
    const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
    scene.add(mercury);
    mercury.position.x = 28;

    function animate() {
      renderer.render(scene, camera);
      // Sun rotate
      sun.rotateY(0.004);
    }
    renderer.setAnimationLoop(animate);
  });
}
