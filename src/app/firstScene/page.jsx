"use client";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function FirstScene() {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Camera Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    camera.position.set(0, 2, 5);

    // Grid
    const griHelper = new THREE.GridHelper(30);
    scene.add(griHelper);

    // Box Geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff8000 });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);
    box.position.set(0, 2, 0);
    box.scale.set(1, 2, 1);

    // Plane Geometry
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);
    planeMesh.rotation.x = -0.5 * Math.PI;

    // Sphere Geometry
    const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
    const sphereMetrial = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      wireframe: false,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMetrial);
    scene.add(sphereMesh);
    sphereMesh.position.set(-10, 4, 0);

    function animate(time) {
      box.rotation.x = time / 1000;
      box.rotation.y = time / 1000;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });
}
