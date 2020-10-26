'use strict';

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var tile = document.createElement('canvas');
var tileCtx = tile.getContext('2d');
var PI_TWO = Math.PI * 2;
var TO_DEG = 180 / Math.PI;
var TO_RAD = Math.PI / 180;
var tileSize = 128;
var random = new Random(Random.engines.mt19937().autoSeed());
var $body = $('body');
var colorsLovers = [];
var colors = [];
var num, pr, height, width;
var downloadAttrSupported = ("download" in document.createElement("a"));
if (downloadAttrSupported == false) {
    alert("Your browser doesn't support HTML5 download attribute. Try using chrome or firefox.");
    document.getElementById('qwer').innerHTML = "<small>1) Enter Size in px and hit new<br/>2)Right click the image at bottom and click save image as.</small>";
    document.getElementById('preview').innerHTML = "<h2 style='color:white;'>Image will appear here</h2>";
    document.getElementById('preview').style.cssText += "max-width:80vw;overflow:scroll";
}
// A collection of profiles from which a single would be chosen to make a tile

var profiles = [
    //profile 0
    function () {

        for (var i = 0; i < 10; i++) {

            tileCtx.fillStyle = '#' + colors[random.integer(0, colors.length - 1)];
            tileCtx.strokeStyle = '#' + colors[random.integer(0, colors.length - 1)];

            var size = random.integer(4, 10);
            tileCtx.beginPath();
            tileCtx.lineWidth = random.integer(1, 6);
            tileCtx.rect(random.integer(0, tileSize), random.integer(0, tileSize), random.integer(4, 50), random.integer(4, 50));
            random.bool() ? tileCtx.fill() : tileCtx.stroke();
            tileCtx.closePath();
        };
    },

    //profile 1
    function () {
        for (var i = 0; i < 10; i++) {
            tileCtx.fillStyle = '#' + colors[random.integer(0, colors.length - 1)];
            tileCtx.strokeStyle = '#' + colors[random.integer(0, colors.length - 1)];

            var size = random.integer(4, 20);
            tileCtx.beginPath();
            tileCtx.lineWidth = random.integer(1, 6);
            tileCtx.rect(random.integer(0, tileSize), random.integer(0, tileSize), size, size);

            random.bool() ? tileCtx.fill() : tileCtx.stroke();

            tileCtx.closePath();
        };
    },

    //profile 2
    function () {
        for (var i = 0; i < 10; i++) {
            tileCtx.fillStyle = '#' + colors[random.integer(0, colors.length - 1)];
            tileCtx.strokeStyle = '#' + colors[random.integer(0, colors.length - 1)];

            var size = random.integer(4, 10);
            tileCtx.beginPath();
            tileCtx.lineWidth = random.integer(1, 6);
            tileCtx.arc(random.integer(0, tileSize), random.integer(0, tileSize), random.integer(10, 120), random.real(Math.PI / 2, PI_TWO), random.real(0, PI_TWO), false);
            random.bool() ? tileCtx.fill() : tileCtx.stroke();
            tileCtx.closePath();
        };
    },

    //profile 3
    function () {

        for (var i = 0; i < 10; i++) {

            tileCtx.fillStyle = '#' + colors[random.integer(0, colors.length - 1)];
            tileCtx.strokeStyle = '#' + colors[random.integer(0, colors.length - 1)];

            var size = random.integer(4, 10);
            tileCtx.beginPath();
            tileCtx.lineWidth = random.integer(1, 6);
            tileCtx.arc(random.integer(0, tileSize), random.integer(0, tileSize), random.integer(5, 10), random.real(0.2, PI_TWO), random.real(0, PI_TWO), false);
            random.bool() ? tileCtx.fill() : tileCtx.stroke();
            tileCtx.closePath();
        };
    },

    //profile 4
    function () {

        for (var i = 0; i < 10; i++) {

            tileCtx.strokeStyle = '#' + colors[random.integer(0, colors.length - 1)];

            tileCtx.beginPath();
            tileCtx.lineWidth = random.integer(2, 4);
            tileCtx.moveTo(random.integer(-25, tileSize + 25), random.integer(-25, tileSize + 25));
            tileCtx.lineTo(random.integer(-25, tileSize + 25), random.integer(-25, tileSize + 25));
            tileCtx.stroke();
            tileCtx.closePath();
        };
    },

    //profile 5
    function () {

        for (var i = 0; i < 10; i++) {

            tileCtx.strokeStyle = '#' + colors[random.integer(0, colors.length - 1)];

            tileCtx.beginPath();
            tileCtx.lineWidth = random.integer(10, 30);
            tileCtx.moveTo(random.integer(0, tileSize), random.integer(0, tileSize));
            tileCtx.lineTo(random.integer(0, tileSize), random.integer(0, tileSize));
            tileCtx.stroke();
            tileCtx.closePath();
        };
    }];
//Profiles End

$.ajax({
    type: 'GET',
    url: 'https://www.colourlovers.com/api/palettes?format=json&numResults=100&keywords=retro&jsonCallback=?',
    dataType: 'json',
    success: function success(data) {

        colorsLovers = data;

        generate();
    },

    error: function error() {

        colorsLovers[0] = {
            colors: []
        };
        colorsLovers[1] = {
            colors: []
        };
        colorsLovers[2] = {
            colors: []
        };
        colorsLovers[3] = {
            colors: []
        };
        colorsLovers[4] = {
            colors: []
        };

        colorsLovers[0].colors = ['FFF5DE', 'B8D9C8', '917081', '750E49', '4D002B'];
        colorsLovers[1].colors = ['FFDABD', '62BEAB', 'FF847C', '2A363B', 'E84A5F'];
        colorsLovers[2].colors = ['9DBDB3', '242116', '884434', 'D0B798', 'D4D4CE'];
        colorsLovers[3].colors = ['FB7968', 'F9C593', 'FAFAD4', 'B0D1B2', '89B2A2'];
        colorsLovers[4].colors = ['EB9C4D', 'F2D680', 'F3FFCF', 'BAC9A9', '697060'];

        generate();
    }
});

//New Image Function
function newImage() {
    obtain(1, 1, 1); //Fetches tilesize,profile,colors
    generate();
}

//Similar Image Function
function similar() {
    obtain(1, 0, 1); //Fetches tilesize,(NOT-profile),colors
    profiles[pr](); // The previosly used profile is used where pr is the index num so that texture remanins same on clicking similar
    generate();
}

function obtain(x, y, z) {
    if (x != 0) {
        tileSize = random.pick([64, 128, 192, 256], 0, 3);
        tile.width = tile.height = tileSize;
    }
    if (y != 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tileCtx.clearRect(0, 0, tile.width, tile.height);
        pr = random.integer(0, profiles.length - 1);
        profiles[pr]();
    }
    height = document.getElementById('height').value;
    width = document.getElementById('width').value;
    height = height != '' ? height : 1080;
    width = width != '' ? width : 1920;
    canvas.height = height;
    canvas.width = width;

    if (z != 0) {
        colors = colorsLovers[random.integer(0, colorsLovers.length - 1)].colors;
        num = random.integer(0, colors.length - 1);
        ctx.fillStyle = '#' + colors[num];
    }
    ctx.fillStyle = '#' + colors[num];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function generate() {

    for (var h = 0; h < canvas.height / tileSize; h++) {
        for (var w = 0; w < canvas.width / tileSize; w++) {
            var index = 10 * h + w;
            ctx.save();
            ctx.translate(w * tileSize + tileSize / 2, h * tileSize + tileSize / 2);
            ctx.rotate(index % 4 * (360 / 4) * TO_RAD);
            ctx.translate(-(w * tileSize + tileSize / 2), -(h * tileSize + tileSize / 2));
            ctx.drawImage(tile, w * tileSize, h * tileSize);
            ctx.restore();
        };
    };
    //Checking if browser supports HTML5 download attribute
    if (downloadAttrSupported == true) {
        $body.css('background-image', `url(${canvas.toDataURL("image/png")})`);
    } else {
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        var preview = document.getElementById('preview');
        preview.innerHTML = "";
        preview.appendChild(image);
    }
}

function downloadImg() {
    obtain(0, 0, 0);
    generate();
    // draw to canvas...
    var link = document.createElement('a');
    link.download = "Codegena.png";
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
