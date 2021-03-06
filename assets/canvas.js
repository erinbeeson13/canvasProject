var loadcount = 0;
var loadtotal = 0;
var preloaded = false;

function loadImages(imagefiles) {
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    var loadedimages = [];
    for (var i=0; i<imagefiles.length; i++) {
        var image = new Image();

        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                preloaded = true;
            }
        };

        image.src = imagefiles[i];
        loadedimages[i] = image;
    }

    return loadedimages;
}

function draw() {
    var canvas = document.getElementById('myCanvas');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var alien = {'x': 10, 'y': 10, 'xVel': 5, 'yVel': 5, 'diameter': 100};

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return setTimeout(callback, 1);
        };

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var images = loadImages(["redBall.png", "wood.jpg", "stars_web.jpg", "Alien.png" ]);
        var woodPattern;
        animate();
    } else {
        console.log("Canvas-unsupported code here");
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        starPattern = ctx.createPattern(images[2], "repeat");
        ctx.fillStyle = starPattern;
        var bgX = 0;
        var bgY = 0;
        var cont = false;
        while (cont==false) {
			ctx.fillRect(bgX, bgY, 300, 300);
			if (bgX + 300 < canvas.width - 20) {
				bgX += 300;
			}else if (bgX + 300 > canvas.width - 20 && bgY + 300 < canvas.height - 20) {
				bgX = 0
				bgY += 300
			}else {
				cont = true;
			}
        };
        
       
        ctx.drawImage(images[3], alien.x, alien.y, alien.diameter, alien.diameter);
        alien.x += alien.xVel;

        if (alien.x > canvasWidth - alien.diameter|| alien.x < 0) {
            alien.xVel *= -1
        }

        requestAnimationFrame(animate);

       
    }
}
