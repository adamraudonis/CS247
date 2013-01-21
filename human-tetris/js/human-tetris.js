
// Images
var IMG_SRC_TUTORIAL  = 'media/tutorial-start.png';
//var IMG_SRC_LEVEL_1  = 'media/level1.png';
//var IMG_SRC_LEVEL_2  = 'media/level2.png';
//var IMG_SRC_LEVEL_3  = 'media/level3.png';


var IMG_SRC_LEVEL_1_1  = 'media/level1-1a.png';
var IMG_SRC_LEVEL_1_2  = 'media/level1-2a.png';
var IMG_SRC_LEVEL_1_3  = 'media/level1-3a.png';
var IMG_SRC_LEVEL_1_4  = 'media/level1-4a.png';
var IMG_SRC_LEVEL_1_5  = 'media/level1-5a.png';
var IMG_SRC_LEVEL_2_1  = 'media/level2-1a.png';
var IMG_SRC_LEVEL_2_2  = 'media/level2-2a.png';
var IMG_SRC_LEVEL_2_3  = 'media/level2-3a.png';
var IMG_SRC_LEVEL_2_4  = 'media/level2-4a.png';
var IMG_SRC_LEVEL_2_5  = 'media/level2-5a.png';
var IMG_SRC_LEVEL_3_1  = 'media/level3-1a.png';
var IMG_SRC_LEVEL_3_2  = 'media/level3-2a.png';
var IMG_SRC_LEVEL_3_3  = 'media/level3-3a.png';
var IMG_SRC_LEVEL_3_4  = 'media/level3-4a.png';
var IMG_SRC_LEVEL_3_5  = 'media/level3-5a.png';

// Sounds
var BEEP_LOW = 'media/beep_low.m4a';
var BEEP_HIGH = 'media/beep_high.m4a';
var CRASH = 'media/crash.mp3';
var RUMBLE = 'media/rumble.m4a';
var SUCCESS = 'media/success.wav';
var VICTORY = 'media/victory.mp3';
var beep_volume = .2;
var beep_low = new Audio(BEEP_LOW); 
beep_low.volume = beep_volume;
var beep_low2 = new Audio(BEEP_LOW); 
beep_low2.volume = beep_volume;
var beep_high = new Audio(BEEP_HIGH); 
beep_high.volume = beep_volume;
var rumble = new Audio(RUMBLE); 
var crash = new Audio(CRASH); 
var success = new Audio(SUCCESS); 


var WHITE  = 255;   // 0 = foreground, 255 = background
var BLACK  = 0;
var BLACK_LIMIT = 50;
var STOP = false;
var ERROR_TOLERANCE = 100;
var IN_TUTORIAL = true;
var current_level = 1;
var TUTORIAL_PIXELS = 15000; // The number of black pixels that must be in the door to start the countdown to play.
var tutorial_cycles = 0;
var level_cycles = 0;
var LVL_CYCLE_INTERVAL = 10;

var stanfordImage;
var imageReady = false;
var current;
var levels;
var stars;
var score = 0;

$(document).ready(function() {
    stanfordImage = new Image();
    if (IN_TUTORIAL) {
        stanfordImage.src = IMG_SRC_TUTORIAL;
    } else {
        stanfordImage.src = IMG_SRC_LEVEL_1; // Debug
    }
    stanfordImage.onload = function() {
        imageReady = true;
    }
    var el = document.getElementById("capture");
    el.style["transition-duration"] = ".1s";
    //el.style["WebkitTransition"] = "all .1s ease-in-out";
    el.style["WebkitTransform"] = "scale(1.5)";

    levels = new Array();
    levels[0] = IMG_SRC_TUTORIAL;
    // levels[1] = IMG_SRC_LEVEL_1;
    // levels[2] = IMG_SRC_LEVEL_2;
    // levels[3] = IMG_SRC_LEVEL_3;
    
     levels[1] = IMG_SRC_LEVEL_1_1;
    // levels[2] = IMG_SRC_LEVEL_1_2;
    // levels[3] = IMG_SRC_LEVEL_1_3;

    levels[2] = 'media/level3-1a.png';
    levels[3] = 'media/level3-2a.png';
    levels[4] = 'media/level3-5a.png';

    //levels[4] = IMG_SRC_LEVEL_1_4;
    levels[5] = IMG_SRC_LEVEL_1_5;
    levels[6] = IMG_SRC_LEVEL_2_1;
    levels[7] = IMG_SRC_LEVEL_2_2;
    levels[8] = IMG_SRC_LEVEL_2_3;
    levels[9] = IMG_SRC_LEVEL_2_4;
    levels[10] = IMG_SRC_LEVEL_2_5;
    levels[11] = IMG_SRC_LEVEL_3_1;
    levels[12] = IMG_SRC_LEVEL_3_2;
    levels[13] = IMG_SRC_LEVEL_3_3;
    levels[14] = IMG_SRC_LEVEL_3_4;
    levels[15] = IMG_SRC_LEVEL_3_5;




    stars = new Array();
    stars[0] = 'media/star.png';
    stars[1] = 'media/star.png';
    stars[2] = 'media/star.png';
    stars[3] = 'media/star.png';
});

function getElementPosition(theElement){
  var posX = 0;
  var posY = 0;
              
  while(theElement != null){
    posX += theElement.offsetLeft;
    posY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
                                      
 return {x:posX,y:posY};

}

function starTouch() {
    var image = getElementPosition(document.getElementById("star1"));
    console.log(image.x + "," + image.y);
    index = (image.x-1)*(image.y-1)*4;
    var pixels = shadowContext.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height);

    if(pixels.data[index] == BLACK && pixels.data[index+1] == BLACK && pixels.data[index+2] == BLACK) {
        console.log("Star 1 touched");
        image.src = "media/starinvert.png";
    }
    image = getElementPosition(document.getElementById("star2"));
    console.log(image.x + "," + image.y);
    index = (image.x-1)*(image.y-1)*4;

    if(pixels.data[index] == BLACK && pixels.data[index+1] == BLACK && pixels.data[index+2] == BLACK) {
        console.log("Star 2 touched");
        image.src = "media/starinvert.png";

    }
    var image = getElementPosition(document.getElementById("star3"));
    console.log(image.x + "," + image.y);
    index = (image.x-1)*(image.y-1)*4;

    if(pixels.data[index] == BLACK && pixels.data[index+1] == BLACK && pixels.data[index+2] == BLACK) {
        console.log("Star 3 touched");
        image.src = "media/starinvert.png";
    }
}


/*
 * In this example, we show you how to overlay the shadow information over
 * an image painted into the canvas. This function is called in a loop
 * by shadowboxing.js. It overrides the default behavior of renderShadow(),
 * which draws the shadow in black on a white canvas.
 */
function renderShadow() {
    if (!background)    // if they haven't captured a background frame
        return;

    // shadowContext.scale(.999,.999);
    // rawCanvas.setAttribute("width",rawCanvas.width * .99);
    // rawCanvas.setAttribute("height",rawCanvas.height * .99);
    // shadowCanvas.setAttribute("width",shadowCanvas.width * .99);
    // shadowCanvas.setAttribute("height",shadowCanvas.height * .99);


    // shadow is an array of length 4*numPixels. Each pixel
    // is an [red green blue alpha] of the shadow information.
    // RGB gives you the color, while alpha indicates opacity.
    // Background pixels are white ([255 255 255 0]) and foreground
    // shadow pixels are black ([0 0 0 0]).
    shadow = getShadowData();

    var numErrors = 0;
    var pixelsOnWhite = 0;
    current = current_level;
    // Drawing from our image onto the canvas
    if (imageReady) {
        // draw the image over the entire canvas
        shadowContext.drawImage(stanfordImage, 0, 0, shadowCanvas.width, shadowCanvas.height);
        if (current_level == 1) {
            var el = document.getElementById("star1");
            el.style.top = "36%";
            el.style.left = "15%";
            el.style.visibility = "visible";
            var el = document.getElementById("star2");
            el.style.top = "25%";
            el.style.left = "50%";
            el.style.visibility = "visible";

            var el = document.getElementById("star3");
            el.style.top = "50%";
            el.style.left = "50%";
            el.style.visibility = "visible";

        } 
        if (current_level == 2) {
            document.getElementById("star1").style.visibility="visible";
            document.getElementById("star2").style.visibility="visible";
            document.getElementById("star3").style.visibility="visible";
            var el = document.getElementById("star1");
            el.style.top = "25%";
            el.style.left = "11%";
            var el = document.getElementById("star2");
            el.style.top = "22%";
            el.style.left = "44%";
            var el = document.getElementById("star3");
            el.style.top = "19%";
            el.style.left = "75%";
        } 
        if (current_level == 3) {
            var el = document.getElementById("star1");
            el.style.top = "33%";
            el.style.left = "33%";
            var el = document.getElementById("star2");
            el.style.top = "50%";
            el.style.left = "45%";
            var el = document.getElementById("star3");
            el.style.top = "33%";
            el.style.left = "63%";
        } 
        if (IN_TUTORIAL) {
            document.getElementById("star1").style.visibility="hidden";
            document.getElementById("star2").style.visibility="hidden";
            document.getElementById("star3").style.visibility="hidden";
        }
        var pixels = shadowContext.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height);

        // Now that the shadowContext has our jpeg painted, we can
        // loop pixel by pixel and only show the parts where the shadow lies.
        // 
        // IMPORTANT: make sure that the width and height of your two
        // canvases match. Otherwise, here be dragons!
        for(var i = 0; i < shadow.data.length; i=i+4) {

            // i = red; i+1 = green; i+2 = blue; i+3 = alpha
            if(shadow.data[i] == BLACK && shadow.data[i+1] == BLACK && shadow.data[i+2] == BLACK) {
                
                if(pixels.data[i] < BLACK_LIMIT && pixels.data[i+1] < BLACK_LIMIT && pixels.data[i+2] < BLACK_LIMIT) {
                    pixels.data[i]   = 255;
                    pixels.data[i+1] = 0;
                    pixels.data[i+2] = 0;
                    numErrors = numErrors + 1;
                } else {

                    if (IN_TUTORIAL) {
                        if(pixels.data[i] == WHITE && pixels.data[i+1] == WHITE && pixels.data[i+2] == WHITE) {
                            pixelsOnWhite = pixelsOnWhite + 1;
                        }
                    };
                    pixels.data[i]   = shadow.data[i];
                    pixels.data[i+1] = shadow.data[i+1];
                    pixels.data[i+2] = shadow.data[i+2];
                } 
            } 
        }

        //console.log(pixelsOnWhite);
        if (pixelsOnWhite > TUTORIAL_PIXELS && IN_TUTORIAL) { // && numErrors < ERROR_TOLERANCE
            tutorial_cycles = tutorial_cycles + 1;
            
            // Display 3,2,1
            $("#tutorialtext").text("2");
            if (tutorial_cycles > 10) {
                    $("#tutorialtext").text("1");
            };
            if (tutorial_cycles > 20) {
                    $("#tutorialtext").text("Starting...");
                    IN_TUTORIAL = false;
                    tutorial_cycles = 0;
                    level_cycles = 0;
                    stanfordImage.src = IMG_SRC_LEVEL_1_1;
                    var el = document.getElementById("capture");
                    el.style["WebkitTransition"] = "all 0s ease-in-out";
                    el.style["WebkitTransform"] = "scale(.5)";
                    // Note: restart if no pixels in x cycles or end of game?
            };
        } else {
            tutorial_cycles = 0;
            //$("#tutorialtext").text("3");

        }


        // And now, paint our pixels array back to the canvas.
        shadowContext.putImageData(pixels, 0, 0);
    }

    if (!IN_TUTORIAL) {
        level_cycles = level_cycles + 1;

        if (level_cycles == 1) {
            $("#tutorialtext").text("3");
        } 
        if (level_cycles == LVL_CYCLE_INTERVAL) {
           // buffers automatically when created
            beep_low.play();

            $("#tutorialtext").text("2");
        } 
        if (level_cycles == LVL_CYCLE_INTERVAL * 2) {
            beep_low2.play();
            $("#tutorialtext").text("1");
        } 
        if (level_cycles == LVL_CYCLE_INTERVAL * 3) {
            rumble.play();
            beep_high.play();
            $("#tutorialtext").text("Start");


            var el = document.getElementById("capture");
            el.addEventListener( 'webkitTransitionEnd', transEnd, false );
            el.style["WebkitTransition"] = "all 3s ease-in";
            el.style["WebkitTransform"] = "scale(1.5)";
            level_cycles = 55; // prevent really big number.
        };
    };



    if (!STOP) {
        // Loop every millisecond. Changing the freq. is a tradeoff between
        // interactivity and performance. Tune to what your machine can support.
         setTimeout(renderShadow, 0);
    } else {
        if (numErrors > ERROR_TOLERANCE) {
            crash.play();
            $("#status").text("You failed!" + numErrors);
            $("#score").text("Score: "+score);


        } else {
            success.play();
            score += 1;
            $("#status").text("You won!" + numErrors);
            $("#score").text("Score: "+score);


        }
        setTimeout(function() {
            current_level = current_level + 1;
            current = current_level;
            if (!levels[current_level]) { // if you reached the end
                console.log("You won!!! END OF GAME");
            } else {
                level_cycles = -5;
                STOP = false;
                IN_TUTORIAL = false;
                stanfordImage.src = levels[current_level];
                current = current_level;
                var el = document.getElementById("capture");
                el.style["WebkitTransition"] = "all 0s ease-in-out";
                el.style["WebkitTransform"] = "scale(.5)";
                setTimeout(renderShadow, 0);
            }
        },1000);
        
    }
   // setTimeout(renderShadow, 0);
}

function transEnd(e)
{
    //console.log("transition ended " + current_level);
    if (level_cycles > 0) {
        STOP = true;
    } 
    score += 1;
    starTouch();
}

function test()
{

    var el = document.getElementById("capture");
    el.addEventListener( 'webkitTransitionEnd', transEnd, false );
    el.style["WebkitTransition"] = "all 3s ease-in";
    el.style["WebkitTransform"] = "scale(1.5)";


    // $('#capture').animate({
    //     width: '640',
    //     height: '320'
    // }, {
    //     duration: 2,
    //     specialEasing: {
    //         width: 'easeInQuad'
    //     }
    // })
}

function restart()
{
    var el = document.getElementById("capture");
    //el.style["transition-duration"] = "";
    el.style["WebkitTransition"] = "all .1s ease-in-out";
    el.style["WebkitTransform"] = "scale(1.5)";
    STOP = true;
    current_level = 0;
    setTimeout(renderShadow, 0);
}
















