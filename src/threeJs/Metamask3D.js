import React, { Component } from "react";
import * as THREE from "three";
import { Scene } from "three";
import { GLTFLoader } from "./GLTFLoader";

export default class MetaMask3D extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.start = this.start.bind(this);
    this.startTime = Date.now();
  }

  componentDidMount() {
    //setup scene and renderer
    this.renderer = new THREE.WebGLRenderer();
    this.width = this.mount.clientHeight;
    this.height = this.mount.clientHeight;
    this.renderer.setSize(this.width, this.height, false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.y = -2;
    this.camera.position.z = 33;

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
    gltfLoader.load("/metamask_wireframe.glb", function (gltf) {
      const foxGeometry = gltf.scene.children[0].geometry;
      const foxWireframe = new THREE.WireframeGeometry(foxGeometry);

      const fox = new THREE.LineSegments(foxWireframe);
      fox.name = "fox";
      fox.material.depthTest = false;
      fox.material.opacity = 0.25;
      fox.material.color = new THREE.Color(0xf6851b);
      fox.transparent = true;
      fox.scale.x = 12;
      fox.scale.y = 12;
      fox.scale.z = 12;
      fox.rotation.x = 1.4;
      fox.rotation.y = 0;
      scene.add(fox);
    });
    this.scene = scene;
  }

  animate() {
    this.resizeCanvasToDisplay();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    if (this.fox) {
      var timer = Date.now() - this.startTime;
      // this.fox.position.y = Math.abs(Math.cos(timer * 0.003)) * 0.5;
      this.fox.rotation.z = Math.sin(timer * 0.001) * 0.2 + 0.3;
      this.renderer.render(this.scene, this.camera);
    } else {
      this.fox = this.scene.getObjectByName("fox", true);
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
        className="w-16 h-16 flex justify-center align-middle"
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
