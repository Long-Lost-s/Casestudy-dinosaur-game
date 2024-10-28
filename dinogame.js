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
     let cactusY = boardHeight - cactusHeight;
     let cactus1Img;
     let cactus2Img;
     let cactus3Img;

     let velocityX = -8;
     let velocityY = 0;
     let gravity = .4;

     let gameOver = false;
     let score = 0;



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

        cactus1Img = new Image();
        cactus1Img.src = "./img/cactus1.png";
        cactus2Img = new Image();
        cactus2Img.src = "./img/cactus2.png";
        cactus3Img = new Image();
        cactus3Img.src = "./img/cactus3.png";

        requestAnimationFrame(update)
        setTimeout(playCactus, 1000);
        document.addEventListener("keydown", moveDino)


    }
    function update() {
        requestAnimationFrame(update);
        if (gameOver) {
            return;
        }

        context.clearRect(0, 0, boardWidth, boardHeight);
        velocityY += gravity;
        dino.y = Math.min(dino.y + velocityY, dinoY);
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

        for (let i = 0; i < cactusArray.length; i++) {
            let cactus = cactusArray[i];
            cactus.x += velocityX;
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

            if (detectCollisions(dino, cactus)) {
                gameOver = true;
                dino.src = "./img/dino-dead.png";
                dinoImg.onload = function() {
                    context.drawImage(dinoImg, dino.x, dino.y, dinoImg.width, dinoImg.height);
                }
            }
        }

        cactusArray = cactusArray.filter(cactus => cactus.x + cactus.width > 0);

        context.fillStyle = "black";
        context.font = "20px courier";
        score++;
        context.fillText(score, 5, 20);

    }

    function moveDino(e) {
        if (gameOver) {
            return;
        }
        if ((e.code === "Space" || e.code === "ArrowUp") && dino.y === dinoY ) {
            velocityY =  -10;
        }
    }

    function playCactus() {
        if (gameOver) {
            return;
        }
        let cactus = {
            img : null,
            x : cactusX,
            y : cactusY,
            width : null,
            height : cactusHeight,
        }

        let placeCactusChance = Math.random()*100;

        if (placeCactusChance > 90) {
            cactus.img = cactus3Img;
            cactus.width = cactus3Width;
            cactusArray.push(cactus);
        } else if (placeCactusChance > 70) {
            cactus.img = cactus2Img;
            cactus.width = cactus2Width;
            cactusArray.push(cactus);
        } else if (placeCactusChance > 50) {
            cactus.img = cactus1Img;
            cactus.width = cactus1Width;
            cactusArray.push(cactus);
        }

        if (cactus.img) {
            cactusArray.push(cactus);
        }

        // Gọi lại playCactus để tạo xương rồng mới định kỳ
        setTimeout(playCactus, 1000);
    }

    function detectCollisions(a, b) {
        return a.x < b.x +b.width &&
               a.x  + a.width > b.x &&
               a.y < b.y +b.height &&
               a.y   + a.height > b.y;
    }