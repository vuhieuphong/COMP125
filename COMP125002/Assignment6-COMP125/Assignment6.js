function loadImages() {
    $("#next").css("display", "block");
    $("#prev").css("display", "block");
    $("#loader").fadeOut("fast");
    $("#circles").fadeIn("fast");
    $("#prev").fadeIn("fast");
    $("#next").fadeIn("fast");
    
    $("#img_01").animate({
        opacity: 1
    });
    
    $("#img_01").html('<img src="images/IMG_01.jpg">');
    $("#img_02").html('<img src="images/IMG_02.jpg">');
    $("#img_03").html('<img src="images/IMG_03.jpg">');
    $("#img_04").html('<img src="images/IMG_04.jpg">');
    $("#img_05").html('<img src="images/IMG_05.jpg">');
    numberChange();
    timer = setInterval(rightAdvance, 3000);
}

var currentImage = 1;
var timer;

function numberChange() {
    for (var i = 1; i <= 5;i++)
    {
        if (i === currentImage) {
            $("#number_0" + i).animate({
                backgroundColor: 'white',
                color: 'black'
            });
        }
        else {
            $("#number_0" + i).animate({
                backgroundColor: 'black',
                color: 'white'
            });
        }
    }
}

function rightAdvance() {
    $("#img_0" + currentImage).fadeOut("slow");
    currentImage++;
    $("#img_0" + currentImage).fadeIn("slow");
    if (currentImage === 6) {
        $("#img_05").fadeOut("slow");
        $("#img_01").fadeIn("slow");
        currentImage = 1;
    }
    numberChange();
}

function nextClicked() {
    clearInterval(timer);
    rightAdvance();
    timer = setInterval(rightAdvance, 3000);
}

function prevClicked() {
    clearInterval(timer);
    $("#img_0" + currentImage).fadeOut("slow");
    currentImage--;
    $("#img_0" + currentImage).fadeIn("slow");
    if (currentImage === 0) {
        $("#img_01").fadeOut("slow");
        $("#img_05").fadeIn("slow");
        currentImage = 5;
    }
    timer = setInterval(rightAdvance, 3000);
    numberChange();
}

$("#next").click(nextClicked);
$("#prev").click(prevClicked);
$("#loader").click(loadImages);

$(".numberCircle").eq(0).click(function () {
    clearInterval(timer);
    $("#img_0" + currentImage).fadeOut("slow");
    currentImage = 1;
    $("#img_0" + currentImage).fadeIn("slow");
    timer = setInterval(rightAdvance, 3000);
    numberChange();
});

$(".numberCircle").eq(1).click(function () {
    clearInterval(timer);
    $("#img_0" + currentImage).fadeOut("slow");
    currentImage = 2;
    $("#img_0" + currentImage).fadeIn("slow");
    timer = setInterval(rightAdvance, 3000);
    numberChange();
});

$(".numberCircle").eq(2).click(function () {
    clearInterval(timer);
    $("#img_0" + currentImage).fadeOut("slow");
    currentImage = 3;
    $("#img_0" + currentImage).fadeIn("slow");
    timer = setInterval(rightAdvance, 3000);
    numberChange();
});

$(".numberCircle").eq(3).click(function () {
    clearInterval(timer);
    $("#img_0" + currentImage).fadeOut("slow");
    currentImage = 4;
    $("#img_0" + currentImage).fadeIn("slow");
    timer = setInterval(rightAdvance, 3000);
    numberChange();
});

$(".numberCircle").eq(4).click(function () {
    clearInterval(timer);
    $("#img_0" + currentImage).fadeOut("slow");
    currentImage = 5;
    $("#img_0" + currentImage).fadeIn("slow");
    timer = setInterval(rightAdvance, 3000);
    numberChange();
});
