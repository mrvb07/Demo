// MAIN GAME FILE

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import LambertMaterial = THREE.MeshLambertMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var cubeGeometry: CubeGeometry;
var planeGeometry: PlaneGeometry;
var cubeMaterial: LambertMaterial;
var planeMaterial: LambertMaterial;
var cube: Mesh;
var plane: Mesh;
var spotLight: SpotLight;
var pointLight: PointLight;
var control: Control;
var gui: GUI;
var stats:Stats;

function init() {
    // Instantiate a new Scene object
	scene = new Scene();
	
	setupRenderer(); // setup the default renderer
	
	setupCamera(); // setup the camera
	
    //Add a Cube to the Scene
	cubeGeometry = new CubeGeometry(6, 6, 6);
	cubeMaterial = new LambertMaterial({color:0x00ff00, opacity:0.5});
	cube = new Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	scene.add(cube);
	console.log("Added Cube Primative to scene...");
	
    //Add a Plane to the Scene
	planeGeometry = new PlaneGeometry(20, 20);
	planeMaterial = new LambertMaterial({color:0xCCCCCC, opacity: 0.5});
	plane = new Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.y = -2;
	
	scene.add(plane);
	console.log("Added Plane Primative to scene...");
	
	// Add a SpotLight to the scene
	spotLight = new SpotLight(0xffffff);
	spotLight.position.set (10, 20, 20);
	spotLight.castShadow = true;
	scene.add(spotLight);
	console.log("Added Spot Light to Scene");
	
	// add extras
	gui = new GUI();
	control = new Control(0.005,  cubeMaterial.opacity, cubeMaterial.color.getHex());
	addControl(control);
	
	addStatsObject();
	
	document.body.appendChild(renderer.domElement);
	gameLoop(); // render the scene	
}

function addControl(controlObject: Control):void {
	gui.add(controlObject, 'rotationSpeed',-0.01,0.01);
	gui.add(controlObject, 'opacity', 0.1, 1);
	gui.addColor(controlObject, 'color');
}

function addStatsObject() {
	stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop():void {
	stats.update();
	
	// render using requestAnimationFrame
	requestAnimationFrame(gameLoop);
	
	cube.material.transparent = true;
	cube.material.opacity = control.opacity;
	cube.material.color = new Color(control.color);
	cube.rotation.y += control.rotationSpeed;
	
	renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer():void {
	renderer = new Renderer();
	renderer.setClearColor(0xCCCCCC, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera():void {
	camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.x =15;
	camera.position.y = 16;
	camera.position.z = 25;
	camera.lookAt(scene.position);
	console.log("Finished setting up Camera...");
}
