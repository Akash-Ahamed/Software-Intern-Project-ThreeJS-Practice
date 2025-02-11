"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ObjectRotateScene() {
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

    // Light (Ambient)
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

    // Create Function for Planet
    function createPlanet(size, texture, position, ring) {
      const geo = new THREE.SphereGeometry(size, 30, 30);
      const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture),
      });
      const mesh = new THREE.Mesh(geo, mat);
      const obj = new THREE.Object3D();
      obj.add(mesh);
      if (ring) {
        const ringGeo = new THREE.RingGeometry(
          ring.innerRadius,
          ring.outerRadius,
          32
        );
        const ringMat = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ring.texture),
          side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
      }
      scene.add(obj);
      mesh.position.x = position;
      return { mesh, obj };
    }

    // Mercury Obect (Child object)
    /*
    const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
    const mercuryMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load("/planet/mercury.jpg"),
    });
    const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
    // Parent object create
    const mercuryParObj = new THREE.Object3D();
    mercuryParObj.add(mercury);
    scene.add(mercuryParObj);
    mercury.position.x = 28;
    */
    /*
    // Saturn Obect
    const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load("/planet/saturn.jpg"),
    });
    const saturn = new THREE.Mesh(saturnGeo, saturnMat);
    // Parent object create
    const saturnParObj = new THREE.Object3D();
    saturnParObj.add(saturn);
    scene.add(saturnParObj);
    saturn.position.x = 138;

    // SaturnRin Obect
    const saturnRingGeo = new THREE.RingGeometry(10, 20, 32);
    const saturnRingMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load("/planet/saturnRing.jpg"),
      side: THREE.DoubleSide,
    });
    const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
    saturnParObj.add(saturnRing);
    saturnRing.position.x = 138;
    saturnRing.rotation.x = -0.5 * Math.PI;
*/

    // Planet
    const mercury = createPlanet(3.2, "/planet/mercury.jpg", 28);
    const venus = createPlanet(5.8, "/planet/venus.jpg", 44);
    const earth = createPlanet(6, "/planet/earth.jpg", 62);
    const mars = createPlanet(4, "/planet/mars.jpg", 78);
    const jupiter = createPlanet(12, "/planet/jupiter.jpg", 100);
    const saturn = createPlanet(10, "/planet/saturn.jpg", 138, {
      innerRadius: 10,
      outerRadius: 20,
      texture: "/planet/saturnRing.png",
    });
    const uranus = createPlanet(7, "/planet/uranus.jpg", 176, {
      innerRadius: 7,
      outerRadius: 12,
      texture: "/planet/uranusRing.png",
    });
    const neptune = createPlanet(7, "/planet/neptune.jpg", 200);
    const pluto = createPlanet(7, "/planet/pluto.jpg", 216);

    // Light (Point)
    const pointLight = new THREE.PointLight(0xffffff, 2000, 300);
    scene.add(pointLight);

    function animate() {
      //Self Rotation
      sun.rotateY(0.004);
      mercury.mesh.rotateY(0.004);
      venus.mesh.rotateY(0.002);
      earth.mesh.rotateY(0.02);
      mars.mesh.rotateY(0.018);
      jupiter.mesh.rotateY(0.04);
      saturn.mesh.rotateY(0.038);
      uranus.mesh.rotateY(0.03);
      neptune.mesh.rotateY(0.032);
      pluto.mesh.rotateY(0.008);

      //Around Sun Rotation
      mercury.obj.rotateY(0.04);
      venus.obj.rotateY(0.015);
      earth.obj.rotateY(0.01);
      mars.obj.rotateY(0.008);
      jupiter.obj.rotateY(0.002);
      saturn.obj.rotateY(0.0009);
      uranus.obj.rotateY(0.0004);
      neptune.obj.rotateY(0.0001);
      pluto.obj.rotateY(0.00007);

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });
}
