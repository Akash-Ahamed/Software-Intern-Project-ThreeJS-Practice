"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon-es";

export default function PhysicsScene() {
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
    camera.position.set(0, 20, -30);

    // Camera Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.update();

    // Box Geometry
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);

    // Sphere Geometry
    const sphereGeo = new THREE.SphereGeometry(2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // Ground Geometry
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    // CANNON
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.81, 0),
    });

    const timeStep = 1 / 60;

    // Ground Physics
    const groundPhyMat = new CANNON.Material();
    const groundBody = new CANNON.Body({
      //shape: new CANNON.Plane(),
      //mass: 10,
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
      material: groundPhyMat,
    });
    world.addBody(groundBody);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    // Box Physics
    const boxPhysMat = new CANNON.Material();
    const boxBody = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
      position: new CANNON.Vec3(1, 20, 0),
      material: boxPhysMat,
    });
    world.addBody(boxBody);
    boxBody.angularVelocity.set(0, 10, 0);
    boxBody.angularDamping = 0.5;

    const groundBoxContactMat = new CANNON.ContactMaterial(
      groundPhyMat,
      boxPhysMat,
      { friction: 0.04 }
    );
    world.addContactMaterial(groundBoxContactMat);

    // Sphere Physics
    const spherePhysMat = new CANNON.Material();
    const sphereBody = new CANNON.Body({
      mass: 4,
      shape: new CANNON.Sphere(2),
      position: new CANNON.Vec3(0, 10, 0),
      material: spherePhysMat,
    });
    world.addBody(sphereBody);
    sphereBody.linearDamping = 0.21;
    const groundSphereContactMat = new CANNON.ContactMaterial(
      groundPhyMat,
      spherePhysMat,
      { restitution: 0.9 }
    );
    world.addContactMaterial(groundSphereContactMat);

    function animate() {
      world.step(timeStep);

      //
      groundMesh.position.copy(groundBody.position);
      groundMesh.quaternion.copy(groundBody.quaternion);

      // Box
      boxMesh.position.copy(boxBody.position);
      boxMesh.quaternion.copy(boxBody.quaternion);

      // Sphere
      sphereMesh.position.copy(sphereBody.position);
      sphereMesh.quaternion.copy(sphereBody.quaternion);

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });
}
