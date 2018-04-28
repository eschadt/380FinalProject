const dashboard = document.getElementById('dashboard');

var referenceWidth;
var referenceHeight;

function setup() {
  // determine the width and height
  referenceWidth = window.innerWidth;
  referenceHeight = window.innerHeight;

  // set the display size
  canvas.style.width = referenceWidth + 'px';
  canvas.style.height = referenceHeight + 'px';

  // Set actual device pixels
  var scale = 1; // window.devicePixelRatio;
  // console.log(scale);
  canvas.width = referenceWidth * scale;
  canvas.height = referenceHeight * scale;

  // normalize the coordinate system
  context.scale(scale, scale);
}


setup();
draw();
