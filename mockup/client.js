var camera, scene, renderer, controls;
var geometry, material, mesh;



var block1, block2, block3, block4, block5;
var block11, block22, block33, block44, block55;

var container = document.getElementById('container');


var light1, light2, light3, light4, light5, light6, light7, light8, light9, light10;

var roadMarkers = [];
const sideBarArr = [];
const arcArr = [];
var lightArr = [];
var buildingArr = [];
var backgroundLights = [];
var roadLightsForRings = [];

var mirrorSphere, mirrorSphereCamera; // for mirror material


//add the lights lining the road
function addRoadLights(x, y , z, color, intensity){

      //var intensity = 3.5;
      var distance = 500;
      var decay = 1.2;

      var sphere = new THREE.SphereGeometry( 15, 30, 30 );
      var light = new THREE.PointLight( color, intensity, distance, decay );
      light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: color } ) ) );
      light.position.set(x, y, z);

      scene.add( light );

      return light;

}

//add a spot light on background city scape
function backgroundLight(){

    var spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 200, 4000, -1000 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 4096;
    spotLight.shadow.mapSize.height = 4096;

    spotLight.shadow.camera.near = 4000;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 100;

    scene.add( spotLight );

}

//add light rings to the road
function addLightRings(x, y, z) {

    var TorusGeometry = new THREE.TorusGeometry( 350, 11, 16, 100 );
    var material = new THREE.MeshStandardMaterial( { color: 0x7B68EE } );
    var torusObject = new THREE.Mesh( TorusGeometry, material );
    scene.add( torusObject );
    torusObject.position.set(x,  y, z);
    arcArr.push(torusObject);
}

function addRoadLightsForRings(x, y , z, color, intensity){

      //var intensity = 3.5;
      var distance = 500;
      var decay = 1.0;

      var sphere = new THREE.SphereGeometry( .01, 30, 30 );
      var light = new THREE.PointLight( color, intensity, distance, decay );
      light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: color } ) ) );
      light.position.set(x, y, z);

      scene.add( light );

      return light;

}


function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );



  camera = new THREE.PerspectiveCamera(100, width/height, 0.1, 25000); // FOV, aspect ration, near, far
  camera.position.set(15, 150, 960); // x, y (move up), back out on the z-axis
  scene.add(camera); // add camera to scene


                lightArr.push(addRoadLights(-275, 200, 700, 0xff0040, 2.5));
                lightArr.push(addRoadLights(335, 200, 700, 0xff0040, 2.5));
                lightArr.push(addRoadLights(-275, 200, 300, 0xff0040, 2.5));
                lightArr.push(addRoadLights(335, 200, 300, 0xff0040, 2.5));
                lightArr.push(addRoadLights(-275, 200, -100, 0xff0040, 2.5));
                lightArr.push(addRoadLights(335, 200, -100, 0xff0040, 2.5));
                lightArr.push(addRoadLights(-275, 200, -500, 0xff0040, 2.5));
                lightArr.push(addRoadLights(335, 200, -500, 0xff0040, 2.5));
                lightArr.push(addRoadLights(-275, 200, -900, 0xff0040, 2.5));
                lightArr.push(addRoadLights(335, 200, -900, 0xff0040, 2.5));
                lightArr.push(addRoadLights(-275, 200, -1300, 0xff0040, 2.5));
                lightArr.push(addRoadLights(335, 200, -1300, 0xff0040, 2.5));
                lightArr.push(addRoadLights(-275, 200, -1700, 0xff0040, 2.5));
                lightArr.push(addRoadLights(335, 200, -1700, 0xff0040, 2.5));

                //add lights in the middle of the road
                for (let k = 0; k < 9; k++) {
                    roadLightsForRings.push(addRoadLightsForRings(15, 200, 700 - k*300, 0x87CEFA, 3.2));
                }

                //add spotlight on the city scape
                backgroundLight();

                //add stars
                //add lights that will run on top of city scape, giving the illusion there are spaceships
                //or stars flying in the landscape.
                backgroundLights.push({light: addRoadLights(-800, 1000, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(-200, 1100, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(400, 1280, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1200, 1600, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1700, 1350, -1900, 0xffffff, 3.5), speed: 60});

                backgroundLights.push({light: addRoadLights(-1000, 1900, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(0, 1400, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(600, 1500, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1200, 2100, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1800, 1809, -1900, 0xffffff, 3.5), speed: 60});

                backgroundLights.push({light: addRoadLights(-1200, 2500, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1500, 2200, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(-700, 1800, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(987, 1000, -1900, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1950, 850, -1900, 0xffffff, 3.5), speed: 60});








                scene.fog = new THREE.Fog(0x000000, -800, 4000)
                //scene.fog = new THREE.FogExp2(0x00FF7F, .001);



    geometry = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block1 = new THREE.Mesh(geometry, material);
    scene.add(block1);
    block1.position.set(-275, 50, 700);
    block1.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block1);

    var geometry2 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block2 = new THREE.Mesh(geometry2, material);
    scene.add(block2);
    block2.position.set(-275, 50, 300);
    block2.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block2);

    var geometry3 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block3 = new THREE.Mesh(geometry3, material);
    scene.add(block3);
    block3.position.set(-275, 50, -100);
    block3.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block3);

    var geometry4 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block4 = new THREE.Mesh(geometry4, material);
    scene.add(block4);
    block4.position.set(-275, 50, -500);
    block4.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block4);

    var geometry9 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block5 = new THREE.Mesh(geometry9, material);
    scene.add(block5);
    block5.position.set(-275, 50, -900);
    block5.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block5);

    var geometry5 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block11 = new THREE.Mesh(geometry5, material);
    scene.add(block11);
    block11.position.set(335, 50, 700);
    block11.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block11);

    var geometry6 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block22 = new THREE.Mesh(geometry6, material);
    scene.add(block22);
    block22.position.set(335, 50, 300);
    block22.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block22);

    var geometry7 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block33 = new THREE.Mesh(geometry7, material);
    scene.add(block33);
    block33.position.set(335, 50, -100);
    block33.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block33);

    var geometry8 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block44 = new THREE.Mesh(geometry8, material);
    scene.add(block44);
    block44.position.set(335, 50, -500);
    block44.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block44);

    var geometry10 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
    block55 = new THREE.Mesh(geometry10, material);
    scene.add(block55);
    block55.position.set(335, 50, -900);
    block55.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block55);

    //add light addLightRings
    for (let k = 0; k < 9; k++) {
        addLightRings(20, -100, 700 - k * 300);
    }
    //stationary ring at end, giving illusion rings have more depth
    var TorusGeometry = new THREE.TorusGeometry( 320, 11, 16, 80 );
    var material = new THREE.MeshStandardMaterial( { color: 0x7B68EE } );
    var torusObject = new THREE.Mesh( TorusGeometry, material );
    scene.add( torusObject );
    torusObject.position.set(20, -100, -1650);
    //arcArr.push(torusObject);


    //add aditional ring that stays stationary so it makes it looks like rings go down further then they do
    //


    //add the road
    geometry = new THREE.PlaneGeometry( 2000, 3000, 32 );
    material = new THREE.MeshStandardMaterial( {color: 0x00000, side: THREE.DoubleSide} );
    var road = new THREE.Mesh( geometry, material );
    road.position.set(-20, 0, -300);
    road.rotation.x = (Math.PI / 180) * 90;
    scene.add( road );



  var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 10, 10); // x, y, vertices
  var floorMaterial = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = Math.PI / 2; // rotate to lay flat
  scene.add(floor);

  for (let k = 0; k < 25; k++) {

      geometry = new THREE.PlaneGeometry( 15, 50, 32 );
      material = new THREE.MeshStandardMaterial( {color: 0xfffff0 , side: THREE.DoubleSide} );
      var marker = new THREE.Mesh( geometry, material );
      marker.rotation.x = (Math.PI / 180) * 90;
      marker.position.set(15, 3, -1500 + k * 100)
      roadMarkers.push(marker);
      scene.add(roadMarkers[k])
  }

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  createCity(16, 800, 100, 3);

  var textureLoader = new THREE.TextureLoader();

  textureLoader.load('city.jpg', function(texture) {
   let material = new THREE.MeshStandardMaterial({map: texture});

   geometry = new THREE.PlaneGeometry( 5000, 3000, 32 );
   var background = new THREE.Mesh( geometry, material );
   //background.rotation.y = (Math.PI / 180) * 180;
   background.position.set(180, 1350, -2200);
   scene.add( background );

 });


//add reflective spehre
//idea taken from inclass example and http://stemkoski.github.io/Three.js/Reflection.html
 var sphereGeom =  new THREE.SphereGeometry( 50, 32, 16 ); // radius, segmentsWidth, segmentsHeight
 mirrorSphereCamera = new THREE.CubeCamera( 0.1, 500, 512 );
 // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
 scene.add( mirrorSphereCamera );
 var mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget } );
 mirrorSphere = new THREE.Mesh( sphereGeom, mirrorSphereMaterial );
 mirrorSphere.position.set(15,50,600);
 mirrorSphereCamera.position = mirrorSphere.position;
 scene.add(mirrorSphere);


  //document.body.appendChild(renderer.domElement);
  //container.appendChild(renderer.domElement);
  //renderer.render(scene, camera);
}


//get ms since 1970.
//
var start = new Date().getTime();
var current;
var delta;
var delay = 45;
var iteration = 0;

var colors = ["0xffffff", "0xffffff", "0xffffff", "0xffffff", "0x00ffff"];


function animate() {

    var startingZ = 700;


	current = new Date().getTime();
	delta = current - start;

	if (delta >= delay) {

		start = new Date().getTime();
		iteration++;

        mirrorSphere.visible = false;
        mirrorSphereCamera.updateCubeMap( renderer, scene );
        mirrorSphere.visible = true;

	}


	renderer.render(scene, camera);
 	controls.update();
	requestAnimationFrame(animate);




    var resetLightRingZ = (arcArr.length - 3) * -300;
    for (let k = 0; k < arcArr.length; k++) {
        arcArr[k].position.z += 20;

        if (arcArr[k].position.z > 1060) {

                arcArr[k].position.z = resetLightRingZ;

        }

    }


    for (let k = 0; k < roadMarkers.length; k++) {
        roadMarkers[k].position.z += 10;

        if (roadMarkers[k].position.z > 1010) {
            roadMarkers[k].position.z = -1500;
        }
    }

    for (let k = 0; k < lightArr.length; k++) {
        lightArr[k].position.z += 20;

        if (lightArr[k].position.z > 1060) {
                lightArr[k].position.z =  -1700;
        }

    }

    for (let k = 0; k < roadLightsForRings.length; k++) {
        roadLightsForRings[k].position.z += 20;

        if (roadLightsForRings[k].position.z > 1060) {
                roadLightsForRings[k].position.z =  resetLightRingZ;
        }
    }

    var resetBuildingZ = startingZ  -  (((buildingArr.length/2) - 1) * spaceforEachBuilding);

    for (let k = 0; k < buildingArr.length; k++) {
        buildingArr[k].position.z += 20;

        if (buildingArr[k].position.z > 1020) {

                buildingArr[k].position.z = resetBuildingZ;

        }

    }

    resetX = -1500;

    for (let k = 0; k < backgroundLights.length; k++) {
        if (backgroundLights[k].light.position.x > 2000) {
            backgroundLights[k].light.position.x = resetX;
        }

        backgroundLights[k].light.position.x += backgroundLights[k].speed;
    }

}


function generateBuildingTexture() {
    var canvas = document.createElement("canvas");
    canvas.width = 256 / 4;
    canvas.height = 512 / 4;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled   = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled  = false;
    ctx.fillStyle='#111111';
    ctx.fillRect(0,0,512,512);
    // fill in the windows
    for (var x = 0 ; x < 256 / 4 ; x+=8) {
        for (var y = 0 ; y < 490 / 4 ; y+=8) {
            //ctx.fillStyle=scale(Math.random()).hex();
            ctx.fillStyle=random_rgba();
            ctx.fillRect(x+1,y+1,6,6);
        }
    }
    for (var x = 0 ; x < 256 / 4 ; x+=8) {
        for (var y = 490 / 4 ; y < 512 / 4 ; y+=8) {
            ctx.fillStyle='#333333';
            ctx.fillRect(x+1,y+1,8,8);
        }
    }
    return canvas;
}

var spaceforEachBuilding = 335;

//most of code for building generation taken and modified from
//https://github.com/josdirksen/essential-threejs/blob/master/chapter-05/05.04-Simple-3D-Buildings.html
//
function createCity(buildingCount, rangeX, rangeY, scale) {

    var startingX = -500;
    var startingZ = 700;
    // create the basic buildingblock
    var buildingBlock = new THREE.BoxGeometry(30,30,100);
    buildingBlock.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
    // setup the texture for the roof
    var uvPixel = 0.0;
    buildingBlock.faceVertexUvs[0][4][0]=new THREE.Vector2(uvPixel,uvPixel);
    buildingBlock.faceVertexUvs[0][4][1]=new THREE.Vector2(uvPixel,uvPixel);
    buildingBlock.faceVertexUvs[0][4][2]=new THREE.Vector2(uvPixel,uvPixel);
    buildingBlock.faceVertexUvs[0][5][0]=new THREE.Vector2(uvPixel,uvPixel);
    buildingBlock.faceVertexUvs[0][5][1]=new THREE.Vector2(uvPixel,uvPixel);
    buildingBlock.faceVertexUvs[0][5][2]=new THREE.Vector2(uvPixel,uvPixel);

    // create buildings
    for (var i = 0 ; i < buildingCount ; i++) {
        // create a custom material for each building
        var material = new THREE.MeshLambertMaterial();
        material.color = new THREE.Color(0xffffff);
        material.map = new THREE.Texture(generateBuildingTexture());
        material.map.anisotropy = renderer.getMaxAnisotropy();
        material.map.needsUpdate    = true;
        // create the mesh
        var building = new THREE.Mesh(buildingBlock, material);
        //var scale =((Math.random()/1.2)+0.5) * scale;
        //var scale = 1.2 * scale;
        // scale the buildings
        building.scale.x = scale * 2;
        building.scale.z = scale;
        building.scale.y = scale * 6;
        // position the buildings
        building.position.x= startingX;
        building.position.z= startingZ;
        building.position.y = ((scale * 6) * buildingBlock.parameters.height) / 2 - 10;
        console.log(buildingBlock.parameters.height);
        // add to scene

        scene.add(building);
        buildingArr.push(building);


        startingZ -= spaceforEachBuilding;

        if (i === (buildingCount/2) - 1){
            startingZ = 700;
            startingX = 550;
        }



    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}



init();
animate(); //animate the light rings above the road animate road markers, animate the lights on the road, building movement, city lights
