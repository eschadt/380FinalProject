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

var planetsOnScene = [];

var highwayMarkersL = [];
var numberOfMarkersL = 7;
var highwayMarkersR = [];
var numberOfMarkersR = 7;

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

  //add markers to space highway
  for (let k = 0; k < numberOfMarkersL; k++) {
      highwayMarkersL.push( addMarkersToHighway(-245) );
      scene.add(highwayMarkersL[k]);
      highwayMarkersR.push( addMarkersToHighway(245) );
      scene.add(highwayMarkersR[k]);
  }

  //space out markers
  spreadOutHighwayMarkers();
  addAnchorMarkers();


  //add planets
  for (let k = 0; k < planetImgPaths.length; k++) {
      createPlanet(planetImgPaths[k], planetImgPaths[k] + "bump", sizes[k]);
  }

  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

//because all the image loading is done sync, finish setup here
function finishInit() {


    planetsOnScene.push(addPlanetToScene());
    scene.add(planetsOnScene[0]);
    animate();
}

//                          //
//      Generate Highway    //
//                          //

//add highway lines on view .. x cords: 500 and -500
function addSpaceHighway() {
        var BoxGeometry = new THREE.BoxGeometry(15, 15, 4300);
        var boxMaterial = new THREE.MeshBasicMaterial({color: 0xfff000, wireframe: true});
        var box = new THREE.Mesh(BoxGeometry, boxMaterial);
        box.position.set(-500, 50, -750);
        box.rotation.y = Math.PI / 180 * -7;
        scene.add(box);
        highwayLines.push(box);

        BoxGeometry = new THREE.BoxGeometry(15, 15, 4300);
        boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var box2 = new THREE.Mesh(BoxGeometry, boxMaterial);
        box2.position.set(500, 50, -750);
        box2.rotation.y = Math.PI / 180 * 7;
        scene.add(box2);
        highwayLines.push(box2);


}

//adds red markers on highway lines, to add movment effect, and to give
//cool guidance effect.
function addMarkersToHighway(xPos) {

    let rotation;

    if (xPos < 0) {
        rotation = Math.PI / 180 * -7;
    }
    else {
        rotation = Math.PI / 180 * 7;
    }
    var BoxGeometry = new THREE.BoxGeometry(20, 20, 25);
    var boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
    var box = new THREE.Mesh(BoxGeometry, boxMaterial);
    box.position.set(xPos, 50, -2600);
    box.rotation.y = rotation;
    return box;
}

function addAnchorMarkers() {
    var BoxGeometry = new THREE.BoxGeometry(20, 20, 100);
    var boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
    var box = new THREE.Mesh(BoxGeometry, boxMaterial);
    box.position.set(-220, 50, -2815);
    box.rotation.y = Math.PI / 180 * -7;
    scene.add(box);

    BoxGeometry = new THREE.BoxGeometry(20, 20, 100);
    boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
    box = new THREE.Mesh(BoxGeometry, boxMaterial);
    box.position.set(220, 50, -2815);
    box.rotation.y = Math.PI / 180 * 7;
    scene.add(box);
}

function spreadOutHighwayMarkers() {

    let initialZLeft = -225;
    let initialZRight = 225;
    let distanceBetweenMarkers = 600;
    for (let k = 0; k < numberOfMarkersL; k++) {
        highwayMarkersL[k].translateZ(k * distanceBetweenMarkers);
        highwayMarkersR[k].translateZ(k * distanceBetweenMarkers);
    }
}


//
//code to add a random planet to the scene
//

var lastIndex = -1;

//MAKE A DEEP COPY ARGHH, add condition so dont spawn same planet back to back.
function getRandomPlanet() {
    let index = Math.floor(Math.random() * 11);

    //to avoid adding two duplicate planets back to back.
    if (lastIndex != -1) { //dont want to check first planet added
        while (lastIndex === index) {
            index = Math.floor(Math.random() * 11);
        }

        //update the last index
        lastIndex = index;
    }

    return planets[index].clone();
}

function addPlanetToScene() {
    //place a planet on the scene
    var planetOnScene = getRandomPlanet();

    planetOnScene.scale.z = .01;
    planetOnScene.scale.x = .01;
    planetOnScene.scale.y = .01;
    let ycord = Math.random() * 350 + 300;
    let xCord = Math.floor(Math.random() * 2) ? 1200 : -1200; //500 or -500
    planetOnScene.position.set(xCord, ycord, -18600);

    return planetOnScene;

}

function addLighting(intensity) {
    var light = new THREE.AmbientLight( 0xf0f0f0, intensity ); // soft white light
    scene.add( light );
}

//modularize this.. todo
function createPlanet(planetImg, bumpImg, planetSize) {
    var planetGeom	= new THREE.SphereGeometry(planetSize, 50, 50);

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

//to move markers along highway
function animateHighwayMarkers() {
    for (let k = 0; k < highwayMarkersL.length; k++) {
        highwayMarkersL[k].translateZ(25);
        highwayMarkersR[k].translateZ(25);
    }
}

//to check position of markers and reset them
function checkHighwayMarkers() {

    for (let k = 0; k < highwayMarkersL.length; k++) {
        if (highwayMarkersL[k].position.z > 1270) {
            highwayMarkersL[k].translateZ(-4170);
        }

        if (highwayMarkersR[k].position.z > 1270) {
            highwayMarkersR[k].translateZ(-4170);
        }

    }
}

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

    for (let k = 0; k < planetsOnScene.length; k++) {
        planetsOnScene[k].position.z += 10;
        planetsOnScene[k].rotation.y += Math.PI/180 * .2;

        if (planetsOnScene[k].scale.z < 1) {
            planetsOnScene[k].scale.z += .00065;
            planetsOnScene[k].scale.x += .00065;
            planetsOnScene[k].scale.y += .00065;
        }

        //as planet gets closer to view, move it over on x-axis so it appears further away.
        if (planetsOnScene[k].position.z > -6000) {

            //its on right side, so move it to right
            //
            if (planetsOnScene[k].position.x > 0) {
                planetsOnScene[k].position.x += .70;
            }
            else { //its on left so move planet to left
                planetsOnScene[k].position.x -= .70;
            }
        }

    }



}

//checks planets z pos, and adds a new planet to scene if conditions met. also deletes
//planets that move off screen
function checkPlanetPosition(){
    let deleteTopPlanetInPlanetsArray = false;

    for (let k = 0; k < planetsOnScene.length; k++) {

        //deletes planet when its out of view on scene
        if (planetsOnScene[k].position.z > 1400) {
            scene.remove( planetsOnScene[k] );
            deleteTopPlanetInPlanetsArray = true;
        }

        //this will keep it so that there are always 2 planets in view.. keep it interesting ;)
        //adds another planet to scene when the planet on scene reaches -8600 z pos.
        if (planetsOnScene[k].position.z === -5000) {
            planetsOnScene.push(addPlanetToScene());
            scene.add(planetsOnScene[planetsOnScene.length - 1]);
        }

    }

    if (deleteTopPlanetInPlanetsArray) {
        planetsOnScene.splice(0, 1);
    }

}

function animate() {
    //get the frame
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    animateStars();
    animatePlanet();
    checkPlanetPosition();
    animateHighwayMarkers();
    checkHighwayMarkers();

}


init();
