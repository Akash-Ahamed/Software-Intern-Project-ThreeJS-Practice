"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function SubdividePlaneScene() {
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
    camera.position.set(10, 15, -22);

    // Camera Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.update();

    // Plane Geometry
    const planeGeo = new THREE.PlaneGeometry(20, 20);
    const planeMat = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      visible: false,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.rotateX(-Math.PI / 2);
    scene.add(planeMesh);

    // Grade
    const grid = new THREE.GridHelper(20, 20);
    scene.add(grid);

    // Sphere Geometry
    const sphereGeo = new THREE.SphereGeometry(0.4, 4, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xffea00,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);

    // Highlight Geometry
    const highilightGeo = new THREE.PlaneGeometry(1, 1);
    const highilightMat = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
    });
    const highilightMesh = new THREE.Mesh(highilightGeo, highilightMat);
    highilightMesh.rotateX(-Math.PI / 2);
    highilightMesh.position.set(0.5, 0, 0.5);
    scene.add(highilightMesh);

    // Mouse Point
    const mousePosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let intersects;

    window.addEventListener("mousemove", function (e) {
      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mousePosition, camera);
      intersects = raycaster.intersectObject(planeMesh);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        const highlightPos = new THREE.Vector3()
          .copy(intersect.point)
          .floor()
          .addScalar(0.5);
        highilightMesh.position.set(highlightPos.x, 0, highlightPos.z);

        const objectExist = objects.find(function (object) {
          return (
            object.position.x === highilightMesh.position.x &&
            object.position.z === highilightMesh.position.z
          );
        });

        if (!objectExist) highilightMesh.material.color.setHex(0xffffff);
        else highilightMesh.material.color.setHex(0xff0000);
      }
    });

    const objects = [];

    window.addEventListener("mousedown", function () {
      const objectExist = objects.find(function (object) {
        return (
          object.position.x === highilightMesh.position.x &&
          object.position.z === highilightMesh.position.z
        );
      });

      if (!objectExist) {
        if (intersects.length > 0) {
          const sphereClone = sphereMesh.clone();
          sphereClone.position.copy(highilightMesh.position);
          scene.add(sphereClone);
          objects.push(sphereClone);
          highilightMesh.material.color.setHex(0xff0000);
        }
      }
      console.log(scene.children.length);
    });

    function animate(time) {
      highilightMesh.material.opacity = 1 + Math.sin(time / 120);
      objects.forEach(function (object) {
        object.rotation.x = time / 1000;
        object.rotation.z = time / 1000;
        object.rotation.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1000));
      });

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });
}
