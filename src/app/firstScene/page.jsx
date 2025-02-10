"use client";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

// Absolute Beginners Tutorial

export default function FirstScene() {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true; // Sahdow Enable
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
    orbitControls.update();

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
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.receiveShadow = true; // Plane reveive the shadow from the sphere

    // Sphere Geometry
    const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
    const sphereMetrial = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      wireframe: false,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMetrial);
    scene.add(sphereMesh);
    sphereMesh.position.set(-10, 4, 0);
    let step = 0;
    sphereMesh.castShadow = true; // Sphere cast shadow from the directional light

    // GUI Show
    const gui = new GUI();
    const options = {
      sphereColor: "0x0000ff",
      wireframe: false,
      speed: 0.01,
      angle: 0.2,
      penumbra: 0,
    };
    gui.addColor(options, "sphereColor").onChange(function (e) {
      sphereMesh.material.color.set(e);
    });

    gui.add(options, "wireframe").onChange(function (e) {
      sphereMesh.material.wireframe = e;
    });

    gui.add(options, "speed", 0, 0.1);
    gui.add(options, "angle", 0, 1);
    gui.add(options, "penumbra", 0, 1);

    /*
    // Light (Ambient)
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    */

    // Light (Directional)
    /*
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    scene.add(directionalLight);
    directionalLight.position.set(-30, 50, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.bottom = -12;

    const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    scene.add(dLightHelper);

    // Shadow camera for directional light
    const dLighShadowHelper = new THREE.CameraHelper(
      directionalLight.shadow.camera
    );
    scene.add(dLighShadowHelper);
    */

    // Light (Spot)
    const spotLight = new THREE.SpotLight(0xffffff, 10000);
    scene.add(spotLight);
    spotLight.position.set(-50, 50, 0);
    spotLight.castShadow = true;
    spotLight.angle = 0.2;

    const sLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(sLightHelper);

    function animate(time) {
      box.rotation.x = time / 1000;
      box.rotation.y = time / 1000;

      //Sphere bounched
      step += options.speed;
      sphereMesh.position.y = 10 * Math.abs(Math.sin(step));

      // Spot light
      spotLight.angle = options.angle;
      sLightHelper.update();

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });
}
