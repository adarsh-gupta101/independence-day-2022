import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//fonts
const fontloader = new THREE.FontLoader();
fontloader.load("font/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextBufferGeometry("Happy 76 Independence Day", {
    font: font,
    size: 0.9,
    height: 0.2,
    curveSegments: 25,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.computeBoundingBox();
  textGeometry.translate(
    -textGeometry.boundingBox.max.x * 0.5,
    -textGeometry.boundingBox.max.y * 0.5,
    -textGeometry.boundingBox.max.z * 0.5
  );

  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap:matcapTexture
  });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);
//enivroment map
//image loader
const loader = new THREE.TextureLoader();
const matcapTextusre = loader.load("textures/matcaps/1.png");
  const envMap ="/textures/matcaps/texture.webp";
    scene.environment=matcapTextusre



  const donut=new THREE.PlaneGeometry(1,.75,100);
  const donutMaterial=new THREE.MeshMatcapMaterial({matcap:matcapTexture,});
for(let i=0;i<100;i++){

const donutMesh =new THREE.Mesh(donut,donutMaterial);
scene.add(donutMesh);

donutMesh.position.x=(Math.random()-0.5)*10;
donutMesh.position.y=(Math.random()-0.5)*10;
donutMesh.position.z=(Math.random()-0.5)*10;
donutMesh.rotation.x=Math.random()*Math.PI;
donutMesh.rotation.y=Math.random()*Math.PI;
// const scale=Math.random()


// donutMesh.scale.set(scale,scale,scale);
}
});

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//axeshelp
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/texture.webp");
/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1.8, 8, 8),
  new THREE.MeshBasicMaterial({ wireframe: true })
);

// scene.add(cube);




/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // console.log(scene.children)

  //animate donut
  for (let i = 0; i < scene.children.length; i++) {
    const child = scene.children[i];
    if (!child instanceof THREE.Mesh) {
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    }
  }


  // Update controls

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
