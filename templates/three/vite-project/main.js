import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useGLTF} from '@react-three/drei'

  const scene = new THREE.Scene()
//   const geo = new THREE.SphereGeometry(3,64,64)
//   const material = new THREE.MeshLambertMaterial({
//     color:"#00ff83",
// })
// const mesh = new THREE.Mesh(geo,material)
// scene.add(mesh)

// const light = new THREE.AmbientLight("blue",500)
// const light1 = new THREE.DirectionalLight("green",200)
// light1.position.set(-2,5,2)
// light.position.set(10,10,10)
// scene.add(light)
// scene.add(light1)

const sizes = {
  width:window.innerWidth,
  height:window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z = 20
scene.add(camera)


const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera)

// const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new GLTFLoader();
const modelPath = '/planet/scene.gltf'; // Replace with the path to your GLTF model
let model;

loader.load(modelPath, (gltf) => {
  model = gltf.scene;
  scene.add(model);
  
  // Optionally, you can manipulate the model after loading
  model.rotation.x = Math.PI / 2; // Example rotation
  model.scale.set(5,5,5); // Example scale
  
  // Render the scene
  animate();
});

// Create an animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Optionally, you can add animations or interactions here
  
  // Render the scene
  renderer.render(scene, camera);
}

const controls = new OrbitControls(camera,canvas)
window.addEventListener("resize",() => {
  console.log(sizes.width)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})


const loop = () => {
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}

loop()

//=====================================================================================================================

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 2;

// // Set up renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// const loader = new GLTFLoader();
// const modelPath = '/planet/scene.gltf'; // Replace with the path to your GLTF model
// let model;

// loader.load(modelPath, (gltf) => {
//   model = gltf.scene;
//   scene.add(model);

//   // Optionally, you can manipulate the model after loading
//   model.rotation.x = Math.PI / 2; // Example rotation
//   model.scale.set(0.5, 0.5, 0.5); // Example scale

//   // Render the scene
//   animate();
// });

// // Create an animation loop
// function animate() {
//   requestAnimationFrame(animate);

//   // Optionally, you can add animations or interactions here

//   // Render the scene
//   renderer.render(scene, camera);
// }


// // Handle window resize
// window.addEventListener('resize', () => {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// });
// // const render = new THREE.WebGLRenderer()

// // render.setSize(window.innerWidth,window.innerHeight)

// // document.body.appendChild(render.domElement)