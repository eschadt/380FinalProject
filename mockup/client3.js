var container, stats;
var camera, scene, renderer, light;
var controls, water;

var roadMarkers = [];
var buildingArr = [];
var lightPosts = [];
var lightPostsL = []; //light posts on the right side of the road

function turnon () {
    var hmm = new THREE.HemisphereLight( 0xffffbb, 0xffffff, 1 );
    scene.add( hmm );
}

function init() {

    container = document.getElementById('scene');

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(43, window.innerWidth / window.innerHeight, .1, 20000);
    camera.position.set(0, 150, 900);


    light = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.add(light);

    turnon(); //!!! F*****K the bad GPUs on mac
    // Water

    var waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000);

    water = new THREE.Water(
        waterGeometry, {
            textureWidth: 1024,
            textureHeight: 1024,
            waterNormals: new THREE.TextureLoader().load('waternormals.jpg', function(texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            alpha: 1,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xff7f50,
            waterColor: 0x000080,//0x3399ff,
            distortionScale: 15,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = -Math.PI / 2;

    scene.add(water);

    // Skybox

    var sky = new THREE.Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    var uniforms = sky.material.uniforms;

    uniforms.turbidity.value = 8;
    uniforms.rayleigh.value = 5;
    uniforms.luminance.value = 1;
    uniforms.mieCoefficient.value = 0.003;
    uniforms.mieDirectionalG.value = 0.8;

    var parameters = {
        distance: 400,
        inclination: 0.49,
        azimuth: 0.2499
    };

    var cubeCamera = new THREE.CubeCamera(1, 20000, 256);
    cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

    function updateSun() {

        var theta = Math.PI * (parameters.inclination - 0.5);
        var phi = 2 * Math.PI * (parameters.azimuth - 0.5);

        light.position.x = parameters.distance * Math.cos(phi);
        light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
        light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);

        sky.material.uniforms.sunPosition.value = light.position.copy(light.position);
        water.material.uniforms.sunDirection.value.copy(light.position).normalize();

        cubeCamera.update(renderer, scene);

    }

    updateSun();


    controls = new THREE.OrbitControls(camera, renderer.domElement);

    buildScene();


    //wish i could have these but it slows down the browser too much :/
    /*setTimeout(function(){
        for (let k = 0; k < 9; k++) {
            var sphere = new THREE.SphereGeometry( 15, 30, 30 );
            var light2 = new THREE.PointLight( 0x8B008B, 2, 500, 1.2);
            light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x8B008B } ) ) );
            light2.position.set(-3300 + k * 375, 800, -3800);
             scene.add( light2 );
        }
    }, 1000);


    setTimeout(function(){
        for (let k = 0; k < 9; k++) {
        var sphere = new THREE.SphereGeometry( 15, 30, 30 );
        var light2 = new THREE.PointLight( 0x8B008B, 2, 500, 1.2);
        light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x8B008B } ) ) );
        light2.position.set(-3300 + k * 375, 1000, -4200);
         scene.add( light2 );
     }
 }, 2000);

    setTimeout(function() {
        for (let k = 0; k < 9; k++) {
        var sphere = new THREE.SphereGeometry( 15, 30, 30 );
        var light2 = new THREE.PointLight( 0x8B008B, 2, 500, 1.2);
        light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x8B008B } ) ) );
        light2.position.set(3300 + k * -375, 800, -3800);
         scene.add( light2 );
     }
 }, 3000);


    setTimeout(function() {
        for (let k = 0; k < 9; k++) {
        var sphere = new THREE.SphereGeometry( 15, 30, 30 );
        var light2 = new THREE.PointLight( 0x8B008B, 2, 500, 1.2);
        light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x8B008B } ) ) );
        light2.position.set(3300 + k * -375, 1000, -4200);
         scene.add( light2 );
     }
 }, 4000); */


}

//
// CODE TO BUILD SCENE
//

function buildScene() {
    addRoad();
    addRoadMarkers();
    addRoadLiner();

    for (let k = 0; k < 11; k++) {
        lightPosts.push(addStreetPostsR());
    }
    positionLightPolesR();
    addAnchorR();

    for (let k = 0; k < 11; k++) {
        lightPostsL.push(addStreetPostsL());
    }
    positionLightPolesL();
    addAnchorL();


    createCity(20, 800, 100, 3, -3700);
    createCity(20, 800, 100, 3, 3700);


}

//adds the road to the scene
//
function addRoad() {
    var geometry = new THREE.PlaneGeometry( 300, 8000, 32 );
    var material = new THREE.MeshPhongMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    var road = new THREE.Mesh( geometry, material );
    road.position.set(0, 75, -1000);
    road.rotation.x = (Math.PI / 180) * 90;
    scene.add( road );
}

//ads the road markers to the scene
//
function addRoadMarkers() {
    for (let k = 0; k < 50; k++) {

        var geometry = new THREE.PlaneGeometry( 10, 50, 32 );
        var material = new THREE.MeshStandardMaterial( {color: 0xfffff0 , side: THREE.DoubleSide} );
        var marker = new THREE.Mesh( geometry, material );
        marker.rotation.x = (Math.PI / 180) * 90;
        marker.position.set(0, 77, -4000 + k * 100)
        roadMarkers.push(marker);
        scene.add(roadMarkers[k])
    }

}

function addRoadLiner() {
    var geometry = new THREE.BoxGeometry( 5, 6000, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x8B008B} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(-150, 77, -2000);
    cube.rotation.x = Math.PI/180 * 90;
    scene.add( cube );

    geometry = new THREE.BoxGeometry( 5, 6000, 1 );
    material = new THREE.MeshBasicMaterial( {color: 0x8B008B} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(150, 77, -2000);
    cube.rotation.x = Math.PI/180 * 90;
    scene.add( cube );
}

//to add custom geo light post with a light next to the road
//
function addStreetPostsR() {

    var material = new THREE.MeshBasicMaterial({color: 0x696969});
    var postGeo = new THREE.BoxGeometry(10,100,10);
    var post = new THREE.Mesh(postGeo, material);
    post.rotation.z = Math.PI/180 * 90;
    post.position.y = 125;
    post.position.x = -45;


    var stickGeometry = new THREE.BoxGeometry(10, 250, 10);
    post.updateMatrix();
    stickGeometry.merge(post.geometry, post.matrix);


    lampPost = new THREE.Mesh(stickGeometry, material);
    lampPost.position.y = 100;
    lampPost.position.x = 175;
    scene.add(lampPost);

    //position light 300 up, 130 over

    var boxLight = new THREE.BoxGeometry( 10, 51, 15 );
    var light = new THREE.PointLight( 0x8B008B, 5, 500, 1.0);
    light.add( new THREE.Mesh( boxLight, new THREE.MeshBasicMaterial( { color: 0x8B008B } ) ) );
    light.position.set(105, 220, 0);
    light.rotation.z = Math.PI / 180 * 90;
    scene.add( light );

    return {lightPost: lampPost, light: light};
}

//to position the light posts along the rode
//
function positionLightPolesR() {


    var startingZ = 700;
    for (let k = 0; k < lightPosts.length; k++) {
        lightPosts[k].lightPost.position.z = startingZ;
        lightPosts[k].light.position.z = startingZ;
        startingZ -= 500;

    }
}

//adds stationary pole to back blocking the regen of poles in the back, thus
//giving illusion there are more poles.
function addAnchorR() {
    var pole = addStreetPostsR();

    pole.lightPost.position.z = -4770;
    pole.light.position.z = -4770;
}

//to add custom geo light post with a light next to the road
//
function addStreetPostsL() {

    var pole = addStreetPostsR();

    console.log(pole);

    pole.lightPost.rotation.y = Math.PI / 180 * 180;
    pole.light.rotation.y = Math.PI / 180 * 180;
    pole.lightPost.position.x = -175;
    pole.light.position.x = -105;

    return pole;
}

//to position the light posts along the rode
//
function positionLightPolesL() {


    var startingZ = 700;
    for (let k = 0; k < lightPosts.length; k++) {
        lightPostsL[k].lightPost.position.z = startingZ;
        lightPostsL[k].light.position.z = startingZ;
        startingZ -= 500;

    }
}

//adds stationary pole to back blocking the regen of poles in the back, thus
//giving illusion there are more poles.
function addAnchorL() {
    var pole = addStreetPostsL();

    pole.lightPost.position.z = -4770;
    pole.light.position.z = -4770;
}

//
// CODE TO ANIMATE SCENE
//

function animateRoadMarkers() {
    for (let k = 0; k < roadMarkers.length; k++) {
        roadMarkers[k].position.z += 10;

        if (roadMarkers[k].position.z > 1000) {
            roadMarkers[k].position.z = -4000;
        }
    }
}

//last pole placed at -4300 z, to preserve spacing at respawn of z 710, place the
//pole back at -4790; animates for both left and right side of the road
//
function animateLightPosts() {
    zReset = -4790;
    zMax = 710;
    zIncrement = 10;

    for (let k = 0; k < lightPosts.length; k++) {
        lightPosts[k].lightPost.position.z += zIncrement;
        lightPosts[k].light.position.z += zIncrement;

        //reset
        if (lightPosts[k].lightPost.position.z >= zMax) {
            lightPosts[k].lightPost.position.z = zReset;
            lightPosts[k].light.position.z = zReset;
        }

    }

    for (let k = 0; k < lightPostsL.length; k++) {
        lightPostsL[k].lightPost.position.z += zIncrement;
        lightPostsL[k].light.position.z += zIncrement;

        //reset
        if (lightPostsL[k].lightPost.position.z >= zMax) {
            lightPostsL[k].lightPost.position.z = zReset;
            lightPostsL[k].light.position.z = zReset;
        }

    }
}

//crap mac cant handle the animation, so i need to slow down the calls just a little
//bit to let the computer catch. //also im probably not writing optimized code either
var start = new Date().getTime();
var current;
var delta;
var delay = 25;


function animate() {

    current = new Date().getTime();
    delta = current - start;

    if (delta >= delay) {
        start = new Date().getTime();

        requestAnimationFrame( animate );
        water.material.uniforms.time.value += -4.0 / 60.0;
        renderer.render( scene, camera );

        animateRoadMarkers();
        animateLightPosts();
    }
    else {
        requestAnimationFrame( animate );
    }

}

//
// building code
//

var spaceforEachBuilding = 335;

//most of code for building generation taken and modified from
//https://github.com/josdirksen/essential-threejs/blob/master/chapter-05/05.04-Simple-3D-Buildings.html
//
function createCity(buildingCount, rangeX, rangeY, scale, startingX) {

    var startingZ = -4000;
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

    var baseScaleY = 35;

    // create buildings
    for (var i = 0 ; i < buildingCount ; i++) {
        // create a custom material for each building
        var material = new THREE.MeshLambertMaterial();
        material.color = new THREE.Color(0xffffff);
        material.map = new THREE.Texture(generateBuildingTexture());
        material.map.anisotropy = renderer.getMaxAnisotropy();
        material.map.needsUpdate = true;
        // create the mesh
        var building = new THREE.Mesh(buildingBlock, material);
        //var scale =((Math.random()/1.2)+0.5) * scale;
        //var scale = 1.2 * scale;
        // scale the buildings
        building.scale.x = scale * 2;
        building.scale.z = scale;
        building.scale.y =  baseScaleY +  Math.random() * 15;
        building.rotation.y = Math.PI / 180 * 90;
        // position the buildings
        building.position.x= startingX;
        building.position.z= startingZ;
        building.position.y = 150;
        console.log(buildingBlock.parameters.height);
        // add to scene

        scene.add(building);
        buildingArr.push(building);


        if (startingX < 0) {
            startingX += 375;
        }
        else {
            startingX -= 375;
        }


        if (i === (buildingCount/2) - 1){

            if (startingX < 0) {
                startingX = -3900;
            }
            else {
                startingX = 3900;
            }

            startingZ -= 300;
            baseScaleY += 15;
        }



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
            ctx.fillStyle= random_rgba();
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

function random_rgba() {
    var random = Math.floor(Math.random() * 10);

    if (random === 0) {
        return 'rgba(254,91,53, 1)';
    }
    else {
        return 'rgba(0, 0, 0, 1)';
    }
}


document.addEventListener("DOMContentLoaded", init);
animate();
