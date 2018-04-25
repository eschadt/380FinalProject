var camera, scene, renderer, controls;
var geometry, material, mesh;
var stars=[];
var highwayLines = [];

//will hold all 9 planets in our solar system plus moon and sun!!
var planets = [];

var planetImgPaths = ["earth", "jupiter", "mars", "mercury", "moon", "neptune"
                        , "pluto", "saturn", "sun", "uranus", "venus"];

//relative (kind of) sizes of the planets, as compared to earth which has base size of 500
var sizes = [550, 1000, 400, 300, 350, 700, 250, 1000, 1000, 600, 480];

var planetOnScene;

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 20000); // FOV, aspect ration, near, far
  camera.position.set(0, 125, 1400); // x, y (move up), back out on the z-axis
  scene.add(camera); // add camera to scene

  let intensity = 1.2;
  addLighting(intensity);


  var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10); // x, y, vertices
  var floorMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = 0;
  floor.position.z = 300;
  floor.position.x = 0;
  floor.rotation.x = Math.PI / 2; // rotate to lay flat
  scene.add(floor);

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //add stars and space highwayLines
  addStars();
  addSpaceHighway();

  //add planets
  for (let k = 0; k < planetImgPaths.length; k++) {
      createPlanet(planetImgPaths[k], planetImgPaths[k] + "bump", sizes[k]);
  }

  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

//because all the image loading is done sync, finish setup here
function finishInit() {

    addPlanetToScene();

    animate();
}

//
//code to add a random planet to the scene
//

function getRandomPlanet() {
    let index = Math.floor(Math.random() * 11);
    return planets[index];
}

function addPlanetToScene() {
    //place a planet on the scene
    planetOnScene = getRandomPlanet();
    planetOnScene.scale.z = .01;
    planetOnScene.scale.x = .01;
    planetOnScene.scale.y = .01;
    let ycord = Math.random() * 350 + 300;
    let xCord = Math.floor(Math.random() * 2) ? 1200 : -1200; //500 or -500
    console.log(planetOnScene.width);
    planetOnScene.position.set(xCord, ycord, -18600);
    scene.add(planetOnScene);

}

function addLighting(intensity) {
    var light = new THREE.AmbientLight( 0xf0f0f0, intensity ); // soft white light
    scene.add( light );
}

//add highway lines on view .. x cords: 500 and -500
function addSpaceHighway() {
        var BoxGeometry = new THREE.BoxGeometry(15, 15, 4000);
        var boxMaterial = new THREE.MeshBasicMaterial({color: 0xfff000, wireframe: true});
        var box = new THREE.Mesh(BoxGeometry, boxMaterial);
        box.position.set(-500, 50, -750);
        box.rotation.y = Math.PI / 180 * -7;
        scene.add(box);
        highwayLines.push(box);

        BoxGeometry = new THREE.BoxGeometry(15, 15, 4000);
        boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var box2 = new THREE.Mesh(BoxGeometry, boxMaterial);
        box2.position.set(500, 50, -750);
        box2.rotation.y = Math.PI / 180 * 7;
        scene.add(box2);
        highwayLines.push(box2);

}

function addLightsToHighway() {

}

//modularize this.. todo
function createPlanet(planetImg, bumpImg, planetSize) {
    var planetGeom	= new THREE.SphereGeometry(planetSize, 32, 32);

    var skinLoader = new THREE.TextureLoader();
    var bumpLoader = new THREE.TextureLoader();


    skinLoader.load('planets/' + planetImg + ".jpg", function(planetTexture) {
        bumpLoader.load('planets/' + bumpImg+ ".jpg", function(bumpTexture){
            let material	= new THREE.MeshStandardMaterial({
                map	: planetTexture,
                bumpMap	: bumpTexture,
                bumpScale: 0.005,

            });

            var planet = new THREE.Mesh(planetGeom, material);
            planets.push(planet);

            //all calls down now
            if (planets.length === 11) {
                finishInit();
            }
        });
   }); //end of all skin loading

}

function addStars(){

    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
	for ( var z= -2000; z < 1000; z+=10 ) {
        // Make a sphere (exactly the same as before).
	    var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
	    var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	    var sphere = new THREE.Mesh(geometry, material)

        // This time we give the sphere random x and y positions between -1000 and 1000
	   sphere.position.x = Math.random() * 2000 - 1000;
	   sphere.position.y = Math.random() * 2000 - 1000;

       // Then set the z position to where it is in the loop (distance of camera)
	   sphere.position.z = z;

       // scale it up a bit
       sphere.scale.x = sphere.scale.y = 2;

       //add the sphere to the scene
       scene.add( sphere );

		//finally push it to the stars array
		stars.push(sphere);
    }
}

//                          //
//          ANIMATION       //
//                          //
//                          //

	function animateStars() {

		// loop through each star
		for(var i=0; i<stars.length; i++) {

			star = stars[i];

			// and move it forward dependent on the mouseY position.
			star.position.z +=  i/10;

			// if the particle is too close move it to the back
			if(star.position.z>2000) star.position.z-=3000;

		}

	}

function animatePlanet() {
    planetOnScene.position.z += 10;
    planetOnScene.rotation.y += Math.PI/180 * .2;

    if (planetOnScene.scale.z < 1) {
        planetOnScene.scale.z += .00065;
        planetOnScene.scale.x += .00065;
        planetOnScene.scale.y += .00065;
    }

    //as planet gets closer to view, move it over on x-axis so it appears further away.
    if (planetOnScene.position.z > -6000) {

        //its on right side, so move it to right
        //
        if (planetOnScene.position.x > 0) {
            planetOnScene.position.x += .70;
        }
        else { //its on left so move planet to left
            planetOnScene.position.x -= .70;
        }
    }
}

function checkPlanetPosition(){
    if (planetOnScene.position.z > 1400) {
        scene.remove( planetOnScene );
        addPlanetToScene();
    }
}

function animate() {
    //get the frame
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    animateStars();
    animatePlanet();
    checkPlanetPosition();

}


init();
