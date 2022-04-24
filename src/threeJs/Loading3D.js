import React, { Component } from "react";
import * as THREE from "three";

export default class Loading3D extends Component {
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
      0,
      1000
    );
    this.camera.position.z = 105;

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
    const cubeGeometry = new THREE.BoxGeometry(42, 42, 42);

    const cubeWireframe = new THREE.WireframeGeometry(cubeGeometry);

    this.cube = new THREE.LineSegments(cubeWireframe);
    this.cube.material.depthTest = false;
    this.cube.material.opacity = 0.25;
    this.cube.material.color = new THREE.Color(0xffffff);
    this.cube.transparent = true;
    this.scene.add(this.cube);
  }

  animate() {
    this.resizeCanvasToDisplay();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    if (this.cube) {
      var timer = Date.now() - this.startTime;
      this.cube.material.color = new THREE.Color(
        `hsl(${timer * 0.1}, 100%, 70%)`
      );
      this.cube.rotation.y = timer * 0.0005; //timer * 0.0003;
      this.cube.rotation.z = timer * 0.0005;
      this.renderer.render(this.scene, this.camera);
    } else {
      this.cube = this.scene.getObjectByName("joe", true);
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
        className="w-20 h-20 flex justify-center align-middle pr-3"
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
