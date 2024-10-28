let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

let cactusArray = [];

 let cactus1Width = 34;
 let cactus2Width = 69;
 let cactus3Width = 102;
 let cactusHeight = 70;
 let cactusX = 700;
 let cactusY = boardHeight - cactusArray.length;
 let cactus1Img;
 let cactus2Img;
 let cactus3Img;



window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    // context.fillStyle = "blue";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);
    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }
    requestAnimationFrame(update)
}
function update() {
    requestAnimationFrame(update);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

}