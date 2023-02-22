//basic declarations
var foodColor = "red";
var snakeColor = "lime";
var boardColor = "black";
var unitSize = 25;
var rows = 20;
var columns = 20;
var board;
var count=0;
var context;
var snakeX = 5 * unitSize;
var snakeY = 5 * unitSize;
var foodX = 10 * unitSize;
var foodY = 10 * unitSize;
var xVelocity = 0;
var yVelocity = 0;
var snakeBody = [];
var mainAudio = new Audio("gameBGM.mp3");
var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = columns * unitSize;
    board.width = rows * unitSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup",changeDirection);
    document.addEventListener('swiped-left', function(e) {
        alert("swiped");
      });
    setInterval(refresh,1000/10);
    gameBGM();
}

function refresh(){
    if (gameOver)
    {
        mainAudio.pause();
        return;
    }
    mainAudio.play();
    //board
    context.fillStyle = boardColor;
    context.fillRect(0, 0, board.width, board.height);
    //food
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize);
    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX,foodY]);
        eatFoodTone();
        placeFood();
        updateScore();
    }
    //snake
    for (let i=snakeBody.length-1;i>0;i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length)
    {
        snakeBody[0] = [snakeX,snakeY];
    }
    context.fillStyle = snakeColor;
    snakeX = snakeX + xVelocity;
    snakeY = snakeY + yVelocity;
    context.fillRect(snakeX, snakeY, unitSize, unitSize);
    for (let i=0;i<snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0],snakeBody[i][1], unitSize, unitSize)
    }
    //gameOver
    //snake eat itself
    for (let i=0;i<snakeBody.length;i++)
    {
        if (snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1])
        {
            gameOver = true;
            gameOverTone();
            setTimeout(gameOverOption,100);
        }
    }
    //snake crossing borders
    if (snakeX < 0 || snakeX > 500 || snakeY < 0 || snakeY > 500)
    {
        gameOver = true;
        gameOverTone();
        setTimeout(gameOverOption,100);
    }


    //mobile
    document.getElementById("up").onclick = function(){
        if (yVelocity != 1 * unitSize)
    {
        xVelocity = 0;
        yVelocity = -1 * unitSize;
    }
    }

    document.getElementById("down").onclick = function(){
        if (yVelocity != -1 * unitSize)
    {
        xVelocity = 0;
        yVelocity = 1 * unitSize;
    }
    }

    document.getElementById("left").onclick = function(){
        if (xVelocity != 1 * unitSize)
    {
        xVelocity = -1 * unitSize;
        yVelocity = 0;
    }
    }

    document.getElementById("right").onclick = function(){
        if (xVelocity != -1 * unitSize)
    {
        xVelocity = 1 * unitSize;
        yVelocity = 0;
    }
    }
}

function placeFood(){
    foodX = (Math.floor(Math.random() * columns) * unitSize);
    foodY = (Math.floor(Math.random() * rows) * unitSize);
}

function changeDirection(e)
{
    if (e.code == "ArrowUp" && yVelocity != 1 * unitSize)
    {
        xVelocity = 0;
        yVelocity = -1 * unitSize;
    }
    else if (e.code == "ArrowDown" && yVelocity != -1 * unitSize)
    {
        xVelocity = 0;
        yVelocity = 1 * unitSize;
    }
    else if (e.code == "ArrowLeft" && xVelocity != 1 * unitSize)
    {
        xVelocity = -1 * unitSize;
        yVelocity = 0;
    }
    else if (e.code == "ArrowRight" && xVelocity != -1 * unitSize)
    {
        xVelocity = 1 * unitSize;
        yVelocity = 0;
    }
    else if (e.code == "Space")
    {
        resetAll();
    }

    
}

function updateScore()
{
    count++;
    const scoreText = document.getElementById("score-text");
    scoreText.textContent = "Score: " + count;
}

function eatFoodTone(){
    var audio = new Audio("food.mp3");
    audio.play();
}

function gameOverTone(){
    var audio = new Audio("gameover.mp3");
    audio.play();
}

function gameOverOption()
{
    var ctx = board.getContext("2d");
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, board.width, board.height);
    const scoreText = document.getElementById("score-text");
    const title = document.getElementById("title");
    const restart = document.getElementById("restart");
    title.textContent = "";
    scoreText.textContent = "";
    restart.classList.remove("hide");
    ctx.font = "50Px 'Press Start 2P'";
    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", 250, 200);
    ctx.font = "20Px 'Press Start 2P'";
    ctx.fillText("Your Score is: " + count, 250, 320);
    ctx.font = "12Px 'Press Start 2P'";
    ctx.fillText("Press Restart or Space Key to restart", 250, 400);
}

function gameBGM(){
    mainAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    mainAudio.play();
}

document.getElementById("restart").addEventListener("click",resetAll);

function resetAll(){
    mainAudio.play();
    location.reload();
}