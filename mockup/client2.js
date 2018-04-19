//Declare three.js variables
var camera, scene, renderer, stars=[];

//assign three.js objects to each variable
function init(){

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    //scene
    scene = new THREE.Scene();

    //renderer
    renderer = new THREE.WebGLRenderer();
    //set the size of the renderer
    renderer.setSize( window.innerWidth, window.innerHeight );

    addSphere();
    buildSpaceHighwayLines();

    //add the renderer to the html document body
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}


function addSphere(){

            // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
            for ( var z= -2000; z < 2000; z+=10 ) {

                // Make a sphere (exactly the same as before).
                var geometry   = new THREE.SphereGeometry(.25, 32, 32)
                var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
                var sphere = new THREE.Mesh(geometry, material)

                // This time we give the sphere random x and y positions between -500 and 500
                sphere.position.x = Math.random() * 1000 - 500;
                sphere.position.y = Math.random() * 1000 - 500;

                // Then set the z position to where it is in the loop (distance of camera)
                sphere.position.z = z;

                // scale it up a bit
                sphere.scale.x = sphere.scale.y = 2;

                //add the sphere to the scene
                //scene.add( sphere );

                //finally push it to the stars array
                stars.push(sphere);
            }
}

function animateStars() {

    // loop through each star
    for(var i=0; i<stars.length; i++) {

        star = stars[i];

        // and move it forward dependent on the mouseY position.
        star.position.z +=  10;

        // if the particle is too close move it to the back
        if(star.position.z>1000) star.position.z-=2000;

    }

}

function buildSpaceHighwayLines() {
    var geometry = new THREE.CylinderGeometry( 5, 5, 500, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var cylinder = new THREE.Mesh( geometry, material );
    //cylinder.position.set(0)
    scene.add( cylinder );
}

function animate() {
    //get the frame
    requestAnimationFrame( render );

    //render the scene
    renderer.render( scene, camera );
    animateStars();

}

init();
animate();
