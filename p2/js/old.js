var IMG_SRC  = 'media/rosebowl.jpg';
var OVERLAY  = 255;   // 0 = foreground, 255 = background
var cycle    = 0;

$(document).ready(function() {

	console.log("Doc ready");
});

/*
 * In this example, we show you how to overlay the shadow information over
 * an image painted into the canvas. This function is called in a loop
 * by shadowboxing.js. It overrides the default behavior of renderShadow(),
 * which draws the shadow in black on a white canvas.
 */
function renderShadow() {
	
	if (!background) {
		return;
	}


	//animCanvas.width = animCanvas.width;
	
	// PixelData is an object with the data, height, width
	pixelData = getShadowData();

	cycle = cycle + 1;

	//rawContext.clearRect(0, 0, 640, 480);
	//rawContext.translate(0, 1 + .001 * cycle);
	//var cycle = (Number(rawCanvas.style.top) + cycle);
	var top = Number(rawCanvas.style.top.substring(0, rawCanvas.style.top.length - 2));
	var newTop = top + cycle;
	rawCanvas.style.top = cycle + "px";
	console.log(rawCanvas.style.top);


	//rawContext.scale(1 + .001 * cycle, 1 + .001 * cycle);
	//shadowContext.scale(1 + .001 * cycle, 1 + .001 * cycle);

	//shadowContext.clearRect(0, 0, 640, 480);


	//animContext.translate(100,0);
   // animContext.scale(1.01,1.01);

	//animCanvas.setAttribute("width",animCanvas.width + 2);
	//animCanvas.setAttribute("height",animCanvas.height + 2);


     	//var canvas  = document.getElementById("ex6");
        var context = animContext;
        var initialWidth = 80;

        var levelbk = document.getElementById('levelImg')
        if (levelbk.width <= 1) { // 640
        	levelbk.setAttribute('width', levelbk.width * 1.02);
    		levelbk.setAttribute('height', levelbk.height * 1.02);
    		levelbk.style.left = (320 - levelbk.width / 2) + "px";
    		levelbk.style.top = (270 - levelbk.height / 2) + "px";
        };
        

        /*
        context.clearRect(0, 0, 640, 480);

        context.save();
        var factor = .05;
        var zoomLevel = 1 + factor * cycle;
        var pixels = zoomLevel * initialWidth * 1.247;
        context.translate(-pixels / 2, -pixels / 2);

        context.scale(zoomLevel, zoomLevel);

        context.fillStyle = "#ff0000";
        context.fillRect(10, 10, 40, 40);

        context.fillStyle = "#0000ff";
        context.fillRect(50, 10, 40, 40);

        context.fillStyle = "#00ffff";
        context.fillRect(10, 50, 40, 40);

        context.fillStyle = "#ffff00";
        context.fillRect(50, 50, 40, 40);

        context.restore();
		*/

/*
	if (!astronautJumping) {
	
		// PixelData.data is an array of length 4*numPixels. Each pixel
		// is an [red green blue alpha] of the shadow information.
		// RGB gives you the color, while alpha indicates opacity.
		// Background pixels are white ([255 255 255 0]) and foreground
		// shadow pixels are black ([0 0 0 0]).
		for(var i = 0; i < pixelData.data.length; i=i+4) {

			// i = red; i+1 = green; i+2 = blue; i+3 = alpha
			if(pixelData.data[i] == OVERLAY && pixelData.data[i+1] == OVERLAY && pixelData.data[i+2] == OVERLAY) {
				// background
			} else {
				// foreground

				var currentRow = Math.floor(i/(pixelData.width * 4));
				var currentCol = (i / 4) % pixelData.width;

				// Check if the pixel is in bounds
				if (currentRow > topBuffer && currentRow < pixelData.height - bottomBuffer
					&& currentCol > sideBuffer && currentCol < pixelData.width - sideBuffer) {

					// Get the high value for the person
					if (currentRow < minRow) {
						minRow = currentRow;
					};
					// Get the lower value for the person
					if (currentRow > maxRow) {
						maxRow = currentRow;
					};
				};
			}
		}

		// Calculate Ground
		// If the previous ground is similiar to the current maxRow then add the cycle
		if (maxRow < previousGroundValue + GROUND_TOLERANCE && maxRow > previousGroundValue - GROUND_TOLERANCE) {
			// The user is probably standing still waiting to jump
			currentGroundCycle = currentGroundCycle + 1;

			// The user finished their real-life jump and the astronaut is ready to perform simulated jump
			if (currentJumpCycle > 0) {
				// If jumpMaxRow == 0 something went wrong.
				console.log("MaxRow  " + maxRow + " JumpMaxRow " + jumpMaxRow + " Ground " + previousGroundValue + " Dist " + (previousGroundValue - jumpMaxRow));
				var jumpDist = previousGroundValue - jumpMaxRow;
				if (jumpDist > 0 && jumpMaxRow != 0) {
					simulateJump(jumpDist);
				};
				currentJumpCycle = 0;
				jumpMaxRow = 1000;
			};

		} else {
			// If the maxrow is different (above) and ground has been acquired and the jump hasn't timed out
			if (currentGroundCycle > MIN_GROUND_WAIT_CYCLES && currentJumpCycle < MAX_JUMP_CYCLES) {
				// We might be in a jump
				currentJumpCycle = currentJumpCycle + 1;

				if (maxRow < jumpMaxRow) {
					jumpMaxRow = maxRow;
				};

			} else {
				// Reset and start a new cycle
				// We might be moving to the jump area
				currentGroundCycle = 0;
				currentJumpCycle = 0;
				previousGroundValue = maxRow;
			}
		}

		if (currentGroundCycle < MIN_GROUND_WAIT_CYCLES) {
			var val = maxRow - astronaut.height + 54; // Plus offset
			astronaut.style.top = val+"px";
		}
	}
*/
	// rawCanvas.setAttribute('width', rawCanvas.width + 1); // 640
 //    rawCanvas.setAttribute('height', rawCanvas.height + 1); // 480

	// Draws the shadow to the screen
	shadowContext.putImageData(pixelData, 0, 0);
//	shadowContext.scale(.5, .5);

	

	setTimeout(renderShadow, 0);

/*
	if (!astronautJumping) {

		//console.log("MIN " + minRow + " MAX " + maxRow);
		// Adds the bounds box
		shadowContext.strokeRect(sideBuffer, topBuffer, pixelData.width - 2 * sideBuffer, pixelData.height - bottomBuffer);

		if (minRow < pixelData.height && maxRow > 0) {
			// Adds the red box
			shadowContext.strokeStyle = '#f00'; // red
			var rectWidth = 100;
			shadowContext.strokeRect((pixelData.width - rectWidth) / 2, minRow, rectWidth, maxRow - minRow);
			//animContext.fillStyle = '#f00'; // red
			//animContext.fillRect((pixelData.width - rectWidth * 1.5) / 2, previousGroundValue, rectWidth * 1.5, 2);

			// Draw Ground
			if (currentGroundCycle >= MIN_GROUND_WAIT_CYCLES) {
				shadowContext.strokeRect((pixelData.width - rectWidth * 1.5) / 2, previousGroundValue, rectWidth * 1.5, 2);
				//animContext.strokeStyle = '#f00'; // red
				//animContext.strokeRect((pixelData.width - rectWidth * 1.5) / 2, previousGroundValue, rectWidth * 1.5, 2);
			};
		};

		setTimeout(renderShadow, 0);

	} else {
		//setTimeout(renderShadow, 1006);
	}
*/
}

function test()
{
	animCanvas.style.left = 100+"px";
}

