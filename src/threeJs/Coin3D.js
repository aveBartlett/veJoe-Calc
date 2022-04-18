import React, { Component } from "react";
import * as THREE from "three";
import { Scene } from "three";
import { GLTFLoader } from "./GLTFLoader";

export default class Coin3D extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.start = this.start.bind(this);
    this.startTime = Date.now();

    this.coin = [];
    this.coinNum = 3;
  }

  componentDidMount() {
    //setup scene and renderer
    this.renderer = new THREE.WebGLRenderer();
    this.width = this.mount.clientHeight;
    this.height = this.mount.clientHeight;
    this.renderer.setSize(this.width, this.height, false);

    this.scene = new THREE.Scene();
    // this.camera = new THREE.PerspectiveCamera(
    //   70,
    //   this.width / this.height,
    //   1,
    //   1000
    // );
    this.camera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      1,
      1000
    );
    this.camera.position.y = 0;
    this.camera.position.z = 40;

    this.setupSceneObjects();
    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  resizeCanvasToDisplay() {
    const width = this.renderer.domElement.clientHeight;
    const height = this.renderer.domElement.clientHeight;
    const canvas = this.renderer.domElement;

    if (canvas.width !== width || canvas.height !== height) {
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  setupSceneObjects() {
    // const cubeGeometry = new THREE.BoxGeometry(300, 300, 300);
    const gltfLoader = new GLTFLoader();
    const scene = new Scene();
    for (let i = 0; i < this.coinNum; i++) {
      gltfLoader.load("/coin_wireframe.glb", function (gltf) {
        const coinGeometry = gltf.scene.children[0].geometry;
        const coinWireframe = new THREE.WireframeGeometry(coinGeometry);

        const coin = new THREE.LineSegments(coinWireframe);
        coin.name = `coin${i}`;
        coin.material.depthTest = false;
        coin.material.opacity = 0.25;
        coin.material.color = new THREE.Color(0xffffffff);
        coin.transparent = true;
        coin.scale.x = 29 - i * 7;
        coin.scale.y = 29 - i * 7;
        coin.scale.z = 29 - i * 7;
        coin.rotation.x = 1.0;
        coin.rotation.y = 0.7;
        scene.add(coin);
      });
    }
    this.scene = scene;
  }

  animate() {
    this.resizeCanvasToDisplay();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    if (this.coin.length > 0) {
      var timer = Date.now() - this.startTime;

      for (let i = 0; i < this.coinNum; i++) {
        // this.coin.position.y = Math.abs(Math.cos(timer * 0.003)) * 0.5;
        this.coin[i].rotation.z = timer * (0.0003 * (i + 1)); // Math.sin(timer * 0.0015) * 0.2 - 0.6;
      }
      this.renderer.render(this.scene, this.camera);
    } else {
      this.coin = this.scene.children;
    }
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  render() {
    return (
      <div
        className="w-16 h-16 flex justify-center align-middle pr-3"
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
