import * as THREE from "three"
console.log("Hello")
const scene = new THREE.Scene()
const geo = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
    color:"#00ff83",
})
const mesh = new THREE.Mesh(geo,material)
scene.add(mesh)
const camera = new THREE.PerspectiveCamera(45,800,600)
scene.add(camera)
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth,window.innerWidth);
renderer.render(scene,camera)
// const render = new THREE.WebGLRenderer()

// render.setSize(window.innerWidth,window.innerHeight)

// document.body.appendChild(render.domElement)