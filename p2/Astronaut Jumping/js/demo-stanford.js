var IMG_SRC  = 'media/rosebowl.jpg';
var OVERLAY  = 255;   // 0 = foreground, 255 = background
var MIN_GROUND_WAIT_CYCLES = 5; // The number of cycles needed to be still to count as ground
var MAX_JUMP_CYCLES = 20;   // The number of cycles you can be away from ground before new ground made.
var currentGroundCycle = 0;
var currentJumpCycle = 0;
var previousGroundValue = 0;
var GROUND_TOLERANCE = 10; // The vertical amount that the ground can vary to still be counted in a cycle
//var LANDING_TOLERANCE = 2; // The distance you need to be from the ground to count as a landing.
var astronautJumping = false;
var jumpMaxRow = 1000;

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

	// Find the min row.
	var minRow = pixelData.height;
	var maxRow = 0;
	var topBuffer = 0;
	var bottomBuffer = 0;
	
	// We can either just mask off a set portion from each side
	// or possibly figure out an appropriate dist from center.
	// This optimization will help get rid of random noise near edges.
	var sideBuffer = 220;

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

	// Draws the shadow to the screen
	shadowContext.putImageData(pixelData, 0, 0);

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
}


function simulateJump(earthJumpDist)
{
    astronautJumping = true;

	// Apply Moon gravity ratio. Could use more complex math later.
    var jumpDist = earthJumpDist * 6;
    var duration = earthJumpDist * 10;

    $('#astronaut').animate({
        top: '-=' + jumpDist
    }, {
        duration: duration,
        specialEasing: {
            width: 'easeOutQuad'
        }
    }).animate({
        top: '+=0'
    }, {
        duration: 5,
        specialEasing: {
            width: 'easeInOutQuad'
        }
    }).animate({
        top: '+=' + jumpDist
    }, {
        duration: duration,
        specialEasing: {
            width: 'easeInQuad'
        }
        ,complete: function() {
            astronautJumping = false;
            renderShadow();
    }});

    //document.getElementById('astronaut').className = 'astronaut';
    // astronaut.style.display = 'none';
}