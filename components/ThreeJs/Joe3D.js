import React, { Component } from "react";
import * as THREE from "three";
import { Scene } from "three";
import { GLTFLoader } from "./GLTFLoader";

export default class Joe3D extends Component {
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
    this.camera.position.y = -11;
    this.camera.position.z = 25;

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
    gltfLoader.load("/Joe_wireframe.glb", function (gltf) {
      const joeGeometry = gltf.scene.children[0].geometry;
      const joeWireframe = new THREE.WireframeGeometry(joeGeometry);

      const joe = new THREE.LineSegments(joeWireframe);
      joe.name = "joe";
      joe.material.depthTest = false;
      joe.material.opacity = 0.25;
      joe.material.color = new THREE.Color(0xffafaf);
      joe.transparent = true;
      joe.scale.x = 3.5;
      joe.scale.y = 1;
      joe.scale.z = 1;
      scene.add(joe);
    });
    this.scene = scene;

    //   // const cubeGeometry = joe.scene;

    //   const cubeWireframe = new THREE.WireframeGeometry(cubeGeometry);

    //   this.cube = new THREE.LineSegments(cubeWireframe);
    //   this.cube.material.depthTest = false;
    //   this.cube.material.opacity = 0.25;
    //   this.cube.material.color = new THREE.Color(0xffffff);
    //   this.cube.transparent = true;
    //   this.scene.add(this.cube);
  }

  animate() {
    this.resizeCanvasToDisplay();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    if (this.joe) {
      var timer = Date.now() - this.startTime;
      this.joe.position.y = Math.abs(Math.cos(timer * 0.003)) * 0.5;
      // this.joe.rotation.z = Math.cos(timer * 0.003) * 0.15;
      this.joe.rotation.y = Math.sin(timer * 0.003) * 0.15; //timer * 0.0003;
      // this.joe.rotation.z = timer * 0.0002;
      // this.camera.lookAt(this.joe.position);
      this.renderer.render(this.scene, this.camera);
    } else {
      this.joe = this.scene.getObjectByName("joe", true);
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
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
