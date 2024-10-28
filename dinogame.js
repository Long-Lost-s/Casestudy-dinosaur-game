    let board;
    let boardWidth = 750;
    let boardHeight = 250;
    let context;

    let dinoWidth = 88;
    let dinoHeight = 94;
    let dinoX = 50;
    let dinoY = boardHeight - dinoHeight;
    let dinoImg;
    let dinoRun1Img;
    let dinoRun2Img;
    let gameOverImg;

    let frameCount = 0;

    let dino = {
        x : dinoX,
        y : dinoY,
        width : dinoWidth,
        height : dinoHeight
    }
    let cloudImg;
    let cloudArray = [];
    let cloudWidth = 100;
    let cloudHeight = 60;
    let cloudSpeed = -2;


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

    let birdArray = [];
    let birdImg;
    let birdWidth = 68;
    let birdHeight = 97;
    let birdSpeed = -3;

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

        dinoRun1Img = new Image();
        dinoRun1Img.src = "./img/dino-run1.png";
        dinoRun2Img = new Image();
        dinoRun2Img.src = "./img/dino-run2.png";
        dinoImg = dinoRun1Img;


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

        cloudImg = new Image();
        cloudImg.src = "./img/cloud.png";

        gameOverImg = new Image();
        gameOverImg.src = "./img/game-over.png";

        birdImg = new Image();
        birdImg.src = "./img/bird1.png";

        requestAnimationFrame(update)
        setTimeout(playCactus, 1000);
        setInterval(playCloud, 3000);
        setInterval(playBird, 4000);
        document.addEventListener("keydown", moveDino);
    }
    function update() {
        requestAnimationFrame(update);
        if (gameOver) {
            context.drawImage(gameOverImg, boardWidth / 2 - 100, boardHeight / 2 - 30, 200, 60);
            // context.drawImage(gameOverImg, boardWidth / 2 - gameOverImg.width / 2, boardHeight / 2 - gameOverImg.height / 2);
            return;
        }

        context.clearRect(0, 0, boardWidth, boardHeight);

        for (let i = 0; i < cloudArray.length; i++) {
            let cloud = cloudArray[i];
            cloud.x += cloudSpeed;
            context.drawImage(cloudImg, cloud.x, cloud.y, cloud.width, cloud.height);
        }
        cloudArray = cloudArray.filter(cloud => cloud.x + cloud.width > 0);

        for (let i = 0; i < birdArray.length; i++) {
            let bird = birdArray[i];
            bird.x += birdSpeed;
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        }

        birdArray = birdArray.filter(bird => bird.x + bird.width > 0);

        velocityY += gravity;
        dino.y = Math.min(dino.y + velocityY, dinoY);

        frameCount++;
        if (frameCount % 10 < 5) {
            dinoImg = dinoRun1Img;
        } else {
            dinoImg = dinoRun2Img;
        }
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

        for (let i = 0; i < cactusArray.length; i++) {
            let cactus = cactusArray[i];
            cactus.x += velocityX;
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

            if (detectCollisions(dino, cactus)) {
                gameOver = true;
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
            img: null,
            x: cactusX,
            y: cactusY,
            width: null,
            height: cactusHeight,
        }

        let placeCactusChance = Math.random() * 100;

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

                setTimeout(playCactus, 1000);
            }
    function playCloud() {
        let cloud = {
            x: boardWidth,
            y: Math.random() * (boardHeight - 150),
            width: cloudWidth,
            height: cloudHeight
        }
        cloudArray.push(cloud);
    }
    function playBird() {
        let bird = {
            x: boardWidth,
            y: Math.random() * (boardHeight - 150),
            width: birdWidth,
            height: birdHeight
        }
        birdArray.push(bird);
    }

            function detectCollisions(a, b) {
                return a.x < b.x + b.width &&
                    a.x + a.width > b.x &&
                    a.y < b.y + b.height &&
                    a.y + a.height > b.y;
            }
