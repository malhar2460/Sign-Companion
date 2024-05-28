// import React from 'react'
// // import {Box} from '@react-three/drei'
// // import { BoxGeometry, Material } from 'three'

// // Extend BoxGeometry to create a new React component
// export default function box() {
//   return (
//     <>
//     <mesh>
//       <sphereBufferGeometry args={[1,32,32]}/>
//     </mesh>
//     <ambientLight args={["#ffffff",1]}/>
//     </>
//   )
// }

// import * as THREE from 'three';
// const render = new THREE.WebGLRenderer();
// console.log("Inside the box");
// render.setSize(window.innerWidth,window.innerHeight);
// const box = new THREE.BoxGeometry(1,1,1)
// render.
// // render.BoxGeometry(1,32)
// // const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
// // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
// // const cube = new THREE.Mesh( geometry, material ); 
// // scene.add( cube );
// document.body.appendChild(render.domElement);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Creates renderer and adds it to the DOM

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//The Box!

//BoxGeometry (makes a geometry)
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//Material to apply to the cube (green)
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//Applies material to BoxGeometry
var cube = new THREE.Mesh( geometry, material );
//Adds cube to the scene
scene.add( cube );

//Sets camera's distance away from cube (using this explanation only for simplicity's sake - in reality this actually sets the 'depth' of the camera's position)

camera.position.z = 5;

//Rendering

function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}
render();