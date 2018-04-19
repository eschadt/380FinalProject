var camera, scene, renderer, controls;
var geometry, material, mesh;

var block1, block2, block3, block4, block5;
var block11, block22, block33, block44, block55;
var curveObject1, curveObject2, curveObject3, curveObject4, curveObject5;

var light1, light2, light3, light4, light5, light6, light7, light8, light9, light10;

var roadMarkers = [];

const sideBarArr = [];
const arcArr = [];
var lightArr = [];
var buildingArr = [];
var backgroundLights = [];

function addRoadLights(x, y , z, color, intensity){

      //var intensity = 3.5;
      var distance = 500;
      var decay = 1.0;

      var sphere = new THREE.SphereGeometry( 15, 30, 30 );
      var light = new THREE.PointLight( color, intensity, distance, decay );
      light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: color } ) ) );
      light.position.set(x, y, z);

      scene.add( light );

      return light;

}

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

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);



  camera = new THREE.PerspectiveCamera(100, width/height, 0.1, 25000); // FOV, aspect ration, near, far
  camera.position.set(0, 100, 900); // x, y (move up), back out on the z-axis
  scene.add(camera); // add camera to scene

  var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
  var c7 = 0xFF5733, c8 = 0x7DFF33, c9 = 0x33C1FF, c10= 0xE933FF;

                lightArr.push(addRoadLights(-275, 200, 700, 0xff0040, 3.5));
                lightArr.push(addRoadLights(335, 200, 700, 0xff0040, 3.5));
                lightArr.push(addRoadLights(-275, 200, 300, 0xff0040, 3.5));
                lightArr.push(addRoadLights(335, 200, 300, 0xff0040, 3.5));
                lightArr.push(addRoadLights(-275, 200, -100, 0xff0040, 3.5));
                lightArr.push(addRoadLights(335, 200, -100, 0xff0040, 3.5));
                lightArr.push(addRoadLights(-275, 200, -500, 0xff0040, 3.5));
                lightArr.push(addRoadLights(335, 200, -500, 0xff0040, 3.5));
                lightArr.push(addRoadLights(-275, 200, -900, 0xff0040, 3.5));
                lightArr.push(addRoadLights(335, 200, -900, 0xff0040, 3.5));

                backgroundLight();


                backgroundLights.push({light: addRoadLights(-800, 1000, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(-200, 1100, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(400, 1280, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1200, 1600, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1700, 1350, -1750, 0xffffff, 3.5), speed: 60});

                backgroundLights.push({light: addRoadLights(-1000, 1900, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(0, 1400, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(600, 1500, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1200, 2100, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1800, 1809, -1750, 0xffffff, 3.5), speed: 60});

                backgroundLights.push({light: addRoadLights(-1200, 2500, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1500, 2200, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(-700, 1800, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(987, 1000, -1750, 0xffffff, 3.5), speed: 60});
                backgroundLights.push({light: addRoadLights(1950, 850, -1750, 0xffffff, 3.5), speed: 60});








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
    material = new THREE.MeshStandardMaterial({color: 0x00ffff, wireframe: false});
    block4 = new THREE.Mesh(geometry4, material);
    scene.add(block4);
    block4.position.set(-275, 50, -500);
    block4.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block4);

    var geometry9 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x00ffff, wireframe: false});
    block5 = new THREE.Mesh(geometry9, material);
    scene.add(block5);
    block5.position.set(-275, 50, -900);
    block5.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block5);

    var geometry5 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: false});
    block11 = new THREE.Mesh(geometry5, material);
    scene.add(block11);
    block11.position.set(335, 50, 700);
    block11.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block11);

    var geometry6 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: false});
    block22 = new THREE.Mesh(geometry6, material);
    scene.add(block22);
    block22.position.set(335, 50, 300);
    block22.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block22);

    var geometry7 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: false});
    block33 = new THREE.Mesh(geometry7, material);
    scene.add(block33);
    block33.position.set(335, 50, -100);
    block33.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block33);

    var geometry8 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x00ffff, wireframe: false});
    block44 = new THREE.Mesh(geometry8, material);
    scene.add(block44);
    block44.position.set(335, 50, -500);
    block44.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block44);

    var geometry10 = new THREE.BoxGeometry( 400, 25, 50 );
    material = new THREE.MeshStandardMaterial({color: 0x00ffff, wireframe: false});
    block55 = new THREE.Mesh(geometry10, material);
    scene.add(block55);
    block55.position.set(335, 50, -900);
    block55.rotation.y = (Math.PI / 180) * 90;
    sideBarArr.push(block55);

    var curve1 = new THREE.QuadraticBezierCurve3(
    	new THREE.Vector3( -330, 0, 700 ),
    	new THREE.Vector3( 25, 500, 700),
    	new THREE.Vector3( 365, 0, 700 )
    );
    var points = curve1.getPoints( 200 );
    var geometryCurve1 = new THREE.BufferGeometry().setFromPoints( points );
    material = new THREE.LineBasicMaterial( {
        color: 0xffffff,
        linewidth: 10
    } );
    curveObject1 = new THREE.Line( geometryCurve1, material );
    scene.add(curveObject1);
    curveObject1.position.z = 0;
    arcArr.push(curveObject1);

    var curve2 = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3( -330, 0, 300 ),
        new THREE.Vector3( 25, 500, 300),
        new THREE.Vector3( 365, 0, 300 )
    );
    var points2 = curve2.getPoints( 200 );
    var geometryCurve2 = new THREE.BufferGeometry().setFromPoints( points2 );
    material = new THREE.LineBasicMaterial( {
        color: 0xffffff,
        linewidth: 10
    } );
    curveObject2 = new THREE.Line( geometryCurve2, material );
    scene.add(curveObject2);
    curveObject2.position.z = 0;
    arcArr.push(curveObject2);

    var curve3 = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3( -330, 0, -100 ),
        new THREE.Vector3( 25, 500, -100),
        new THREE.Vector3( 365, 0, -100 )
    );
    var points3 = curve3.getPoints( 200 );
    var geometryCurve3 = new THREE.BufferGeometry().setFromPoints( points3 );
    material = new THREE.LineBasicMaterial( {
        color: 0xffffff,
        linewidth: 10
    } );
    curveObject3 = new THREE.Line( geometryCurve3, material );
    scene.add(curveObject3);
    curveObject3.position.z = 0;
    arcArr.push(curveObject3);

    var curve4 = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3( -330, 0, -500 ),
        new THREE.Vector3( 25.5, 500, -500),
        new THREE.Vector3( 365, 0, -500 )
    );
    var points4 = curve4.getPoints( 200 );
    var geometryCurve4 = new THREE.BufferGeometry().setFromPoints( points4 );
    material = new THREE.LineBasicMaterial( {
        color: 0xffffff,
        linewidth: 10
    } );
    curveObject4 = new THREE.Line( geometryCurve4, material );
    scene.add(curveObject4);
    curveObject4.position.z = 0;
    arcArr.push(curveObject4);

    var curve5 = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3( -330, 0, -900 ),
        new THREE.Vector3( 25.5, 500, -900),
        new THREE.Vector3( 365, 0, -900 )
    );
    var points5 = curve5.getPoints( 200 );
    var geometryCurve5 = new THREE.BufferGeometry().setFromPoints( points5 );
    material = new THREE.LineBasicMaterial( {
        color: 0xffffff,
        linewidth: 10
    } );
    curveObject5 = new THREE.Line( geometryCurve5, material );
    scene.add(curveObject5);
    curveObject5.position.z = 0;
    arcArr.push(curveObject5);

    geometry = new THREE.PlaneGeometry( 2000, 1800, 32 );
    material = new THREE.MeshStandardMaterial( {color: 0x00000, side: THREE.DoubleSide} );
    var road = new THREE.Mesh( geometry, material );
    road.rotation.x = (Math.PI / 180) * 90;
    road.position.set(-20, 0, 0);
    scene.add( road );




  var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 10, 10); // x, y, vertices
  var floorMaterial = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: false});
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = Math.PI / 2; // rotate to lay flat
  scene.add(floor);

  for (let k = 0; k < 19; k++) {

      geometry = new THREE.PlaneGeometry( 25, 50, 32 );
      material = new THREE.MeshStandardMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
      var marker = new THREE.Mesh( geometry, material );
      marker.rotation.x = (Math.PI / 180) * 90;
      marker.position.set(0, 0, -900 + k * 100)
      roadMarkers.push(marker);
      scene.add(roadMarkers[k])
  }

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  createCity(14, 800, 100, 3);

  setUpColor();

  var textureLoader = new THREE.TextureLoader();

  textureLoader.load('city.jpg', function(texture) {
   let material = new THREE.MeshStandardMaterial({map: texture});

   geometry = new THREE.PlaneGeometry( 5000, 3000, 32 );
   var background = new THREE.Mesh( geometry, material );
   //background.rotation.y = (Math.PI / 180) * 180;
   background.position.set(180, 1350, -1800);
   scene.add( background );

 });



  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

//get ms since 1970.
//
var start = new Date().getTime();
var current;
var delta;
var delay = 300;
var iteration = 0;

var colors = ["0xffffff", "0xffffff", "0xffffff", "0xffffff", "0x00ffff"];


function animate() {

	current = new Date().getTime();
	delta = current - start;


	if (delta >= delay) {

		start = new Date().getTime();
		iteration++;


  		renderer.render(scene, camera);
 	 	controls.update();

        for (let k = 0; k < arcArr.length; k++) {
            arcArr[k].material.color.setHex( colors[(iteration + k) % 5]);
        }

	}

	renderer.render(scene, camera);
 	controls.update();


	requestAnimationFrame(animate);


    for (let k = 0; k < roadMarkers.length; k++) {
        roadMarkers[k].position.z += 10;

        if (roadMarkers[k].position.z > 1010) {
            roadMarkers[k].position.set(0, 0, -900);
        }
    }

    for (let k = 0; k < lightArr.length; k++) {
        lightArr[k].position.z += 20.75;

        if (lightArr[k].position.z > 1010) {
            if (k % 2) { //left side
                lightArr[k].position.set(-275, 200, -900);
            }
            else { //right side
                lightArr[k].position.set(335, 200, -900);
            }
        }

    }

    var startingZ = 700;
    var resetZ = startingZ  -  (((buildingArr.length/2) - 1) * spaceforEachBuilding);

    for (let k = 0; k < buildingArr.length; k++) {
        buildingArr[k].position.z += 20.75;

        if (buildingArr[k].position.z > 1010) {

                buildingArr[k].position.z = resetZ;

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

function setUpColor() {


    block1.material.color.setHex( colors[0] );
    block2.material.color.setHex( colors[1] );
    block3.material.color.setHex( colors[2] );
    block4.material.color.setHex( colors[3] );
    block5.material.color.setHex( colors[4] );

    block11.material.color.setHex( colors[0] );
    block22.material.color.setHex( colors[1] );
    block33.material.color.setHex( colors[2] );
    block44.material.color.setHex( colors[3] );
    block55.material.color.setHex( colors[4] );

    //curveObject1.material.color.setHex( colors[iteration % 5] );
    curveObject1.material.color.setHex( colors[0] );
    curveObject2.material.color.setHex( colors[1] );
    curveObject3.material.color.setHex( colors[2] );
    curveObject4.material.color.setHex( colors[3] );
    curveObject5.material.color.setHex( colors[3] );

    console.log(curveObject5);

}


init();
animate(); //animate the light rings above the road animate road markers, animate the lights on the road, building movement, city lights
