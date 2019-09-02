"use strict";
var alpacasound = document.getElementById("alpacasound");

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//create reset score button
var resetScoreBtn = document.createElement("div");
var resetScoreText = document.createTextNode("Reset Score");
resetScoreBtn.appendChild(resetScoreText);
resetScoreBtn.style.textAlign = "center";
resetScoreBtn.style.cursor = "pointer";
resetScoreBtn.style.display = "inline-block";
resetScoreBtn.style.width = "130px";
resetScoreBtn.style.marginLeft = "80px";
resetScoreBtn.style.backgroundImage = "url('images/buttonbg.png')";
resetScoreBtn.style.height = "30px";
resetScoreBtn.style.lineHeight = "30px";
resetScoreBtn.style.border = "1px dashed black";
//create reset speed button
var resetSpeedBtn = document.createElement("div");
var resetSpeedText = document.createTextNode("Reset Speed");
resetSpeedBtn.appendChild(resetSpeedText);
resetSpeedBtn.style.textAlign = "center";
resetSpeedBtn.style.cursor = "pointer";
resetSpeedBtn.style.display = "inline-block";
resetSpeedBtn.style.width = "130px";
resetSpeedBtn.style.marginLeft = "80px";
resetSpeedBtn.style.backgroundImage = "url('images/buttonbg.png')";
resetSpeedBtn.style.height = "30px";
resetSpeedBtn.style.lineHeight = "30px";
resetSpeedBtn.style.border = "1px dashed black";
resetSpeedBtn.style.marginTop = "20px";
//create menu
var menu = document.createElement("div");
document.body.appendChild(menu);
menu.appendChild(resetScoreBtn);
menu.appendChild(resetSpeedBtn);

menu.style.width = "508px";
menu.style.fontFamily = "Consolas";
menu.style.marginTop = "20px";
menu.style.border = "2px dotted gray";
menu.style.backgroundImage = "url('images/menubg.gif')";
var instruction = document.createElement("div");
instruction.style.fontSize = "20px";
instruction.style.marginTop = "20px";
instruction.style.marginLeft = "100px";
instruction.innerHTML = "<img src='images/whitealpaca.png' style='height:30px;vertical-align:text-bottom'>&nbsp;+1 score<img src='images/brownalpaca.png' style='height:30px;margin-left:78px;vertical-align:text-bottom'>&nbsp;-1 score";
instruction.style.marginBottom = "20px";
menu.appendChild(instruction);

var credit = document.createElement("h5");
credit.innerHTML ="Created by Vu Hieu Phong - 301049781<br><br><a href='../index.html'>Back to index</a>"
document.body.appendChild(credit);
credit.style.width = "512px";
credit.style.textAlign = "center";
credit.style.color = "#663300";
credit.style.fontFamily = "Consolas";

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.jpg";
// White Alpaca image
var whitealpacaReady = false;
var whitealpacaImage = new Image();
whitealpacaImage.onload = function () {
    whitealpacaReady = true;
};
whitealpacaImage.src = "images/whitealpaca.png";
// Brown Alpaca image
var brownalpacaReady = false;
var brownalpacaImage = new Image();
brownalpacaImage.onload = function () {
    brownalpacaReady = true;
};
brownalpacaImage.src = "images/brownalpaca.png";
// Game objects
var whitealpaca = {
    x: 210,
    y: 210
};
var brownalpaca = {
    x: 270,
    y: 210
};
var whitealpacasCaught = 0;

// Reset the game when the player catches an alpaca
var reset = function () {
    // Throw the alpacas somewhere on the screen randomly
    whitealpaca.x = 34 + (Math.random() * (canvas.width - 162));
    whitealpaca.y = 34 + (Math.random() * (canvas.height - 162));
    brownalpaca.x = 34 + (Math.random() * (canvas.width - 162));
    brownalpaca.y = 34 + (Math.random() * (canvas.height - 162));
};

//mouse events 
var mousex;
var mousey;
addEventListener("mousedown", function (e) {
    mousex = e.clientX;
    mousey = e.clientY;
}, false);

addEventListener("mouseup", function () {
    mousex = null;
    mousey = null;
}, false);

addEventListener("touchstart", function (e) {
    mousex = e.touches[0].clientX;
    mousey = e.touches[0].clientY;
}, false);
addEventListener("touchend", function () {
    mousex = null;
    mousey = null;
}, false);

//update scores
var update = function () {
    if (
        mousex <= (whitealpaca.x + 34)
        && whitealpaca.x <= (mousex + 34)
        && mousey <= (whitealpaca.y + 62)
        && whitealpaca.y <= (mousey + 62)
    ) {
        if (time > 1000) {
            time -= 100;
        }
        else {
            time -= 0;
        }
        alpacasound.play();
        ++whitealpacasCaught;
        reset();
        clearInterval(resetTimer);
        resetTimer = setInterval(reset, time);
        mousex = null;
        mousey = null;
    }
    if (
        mousex <= (brownalpaca.x + 34)
        && brownalpaca.x <= (mousex + 34)
        && mousey <= (brownalpaca.y + 62)
        && brownalpaca.y <= (mousey + 62)
    ) {
        if (whitealpacasCaught > 0) {
            --whitealpacasCaught;
        }
        alpacasound.play();
        reset();
        clearInterval(resetTimer);
        resetTimer = setInterval(reset, time);
        mousex = null;
        mousey = null;
    }
    else {
        mousex = null;
        mousey = null;
    }
}

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (whitealpacaReady) {
        ctx.drawImage(whitealpacaImage, whitealpaca.x, whitealpaca.y);
    }
    if (whitealpacaReady) {
        ctx.drawImage(brownalpacaImage, brownalpaca.x, brownalpaca.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "20px Consolas";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Your Score: " + whitealpacasCaught, 30, 30);
    ctx.fillText("Your timer: " + time, 300, 30);
};
// The main game loop
var main = function () {
    update();
    render();


    // Request to do this again ASAP
    requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
    main();
var time = 3000;
var resetTimer = setInterval(reset, time);  
//reset score
resetScoreBtn.addEventListener("click", function () {
    whitealpacasCaught = 0;
}, false);
//reset speed
resetSpeedBtn.addEventListener("click", function () {
    time = 3000;
    clearInterval(resetTimer);
    resetTimer = setInterval(reset, time);
}, false);
