var camera, scene, renderer, controls;
var geometry, material, mesh;

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000); // FOV, aspect ration, near, far
  camera.position.set(0, 200, 700); // x, y (move up), back out on the z-axis
  scene.add(camera); // add camera to scene

  // Define a main Geometry used for the final mesh
  var mainGeometry = new THREE.Geometry();

  // Create a Geometry, a Material and a Mesh shared by all the shapes you want to merge together (here I did 1000 cubes)
  var cubeGeometry = new THREE.CubeGeometry( 1, 1, 1 );
  var cubeMaterial = new THREE.MeshBasicMaterial({vertexColors: true});
  var cubeMesh = new THREE.Mesh( cubeGeometry );

  var i = 0;

  for ( i; i<1000; i++ ) {

      // I set the color to the material for each of my cubes individually, which is just random here
      cubeMaterial.color.setHex(Math.random() * 0xffffff);

      // For each face of the cube, I assign the color
      for ( var j = 0; j < cubeGeometry.faces.length; j ++ ) {
          cubeGeometry.faces[ j ].color = cubeMaterial.color;
  }

      // Each cube is merged to the mainGeometry
      THREE.GeometryUtils.merge(mainGeometry, cubeMesh);
   }

   // Then I create my final mesh, composed of the mainGeometry and the cubeMaterial
   var finalMesh = new THREE.Mesh( mainGeometry, cubeMaterial );
   scene.add( finalMesh );

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
}

init();
animate(); // call animate function after scene is initialized
