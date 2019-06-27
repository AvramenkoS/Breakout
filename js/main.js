document.getElementById('button').addEventListener('click', activate);

function activate(){

document.querySelector('a').style.display = 'none';


let div = document.querySelector('div'),
	btn = document.createElement('button'),
	canv = document.createElement('canvas');

	div.appendChild(canv);
	canv.id = 'canvas';
	canv.width = '1000';
	canv.height = '320';

//---------------------------------------------------

let canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		   x = canvas.width / 2,
		    y = canvas.height - 30;

let ballRadius = 10,
			 dx = 5,
			  dy = -5;

let paddleHeight = 10,
	  paddleWidth = 100,
	  	   paddleX = (canvas.width - paddleWidth) / 2,
	  	    paddleY = canvas.height - paddleHeight; 

let leftPressed = false,
	rightPressed = false;

let	brickX, brickY,
 bricksWidth = 80,
 bricksHeight = 20,
 bricksPadding = 10,
bricksOffsetTop = 10,
bricksOffsetLeft = 10,
bricksColumnCount = 11,
	bricksRowCount = 3;

let bricks = [], i, j, q,
	  score = 0,
	   lives = 3;


//------------------------------------------------------

for(i = 0; i < bricksColumnCount; i += 1){
	bricks[i] = [];
	for(j = 0; j < bricksRowCount; j += 1){
		bricks[i][j] = {
			x: 0,
			y: 0,
			status: 1
		}
	}
}

//-------------------------------------------------------

function draw() {
	drawBall();
	drawPaddle();
	drawBricks();
	extinctionBricks();
	ourScore();
	ourLives();

//-------------------------------------------------------
	
	if(x >= canvas.width - ballRadius || x <= ballRadius){
		dx = -dx
	}
	if(y <= ballRadius){
		dy = -dy
	}else if(y >= canvas.height - ballRadius){
		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy
		}else{
			lives--;
			if(!lives){
				// div.appendChild(btn);
				// btn.id = 'btn';
				alert('You lose, your score: ' + score + 'points!');
				document.location.reload(true);
			}else{
				x = canvas.width / 2;
        		y = canvas.height - 30;
        		dx++; //швидкість вісля втрати lives
        		dy++;
        		paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	//---------------------------------------------------

	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 10;
	}else if(leftPressed && paddleX > 0){
		paddleX -= 10;
	}
	requestAnimationFrame(draw);
};

draw();

//-------------------------------------------------------

function keyDownHandler(event){
	if(event.keyCode === 37){
		leftPressed = true;
	}else if(event.keyCode === 39){
		rightPressed = true;
	}
};

function keyUpHandler(event){
	if(event.keyCode === 37){
		leftPressed = false;
	}else if(event.keyCode === 39){
		rightPressed = false;
	}
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function ourLives(){
	ctx.font = '24px sans-serif';
	ctx.fillStyle = 'yellow';
	ctx.fillText('Lives: ' + lives, canvas.width - 100, 200);
	ctx.fill();
}

function ourScore(){
	ctx.font = '24px sans-serif';
	ctx.fillStyle = 'yellow';
	ctx.fillText('Score: ' + score, 8, 200)
	ctx.fill();
};

function extinctionBricks(){
	for(i = 0; i < bricksColumnCount; i += 1){
		for(j = 0; j < bricksRowCount; j += 1){
			q = bricks[i][j];
			if(q.status === 1){
				if(x > q.x && x < q.x + bricksWidth && y > q.y && y < q.y + bricksHeight){
					dy = -dy;
					q.status = 0;
					score++;
					if(score === bricksRowCount * bricksColumnCount){
						alert('You won, your score: ' + score + ' points!');
						document.location.reload(true)
					}
				}
			}
		}
	}
};

function drawBricks(){
	for(i = 0; i < bricksColumnCount; i += 1){
		for(j = 0; j < bricksRowCount; j += 1){
			if(bricks[i][j].status === 1){
				brickX = i * (bricksWidth + bricksPadding) + bricksOffsetLeft;
				brickY = j * (bricksHeight + bricksPadding) + bricksOffsetTop;
				bricks[i][j].x = brickX;
            	bricks[i][j].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, bricksWidth, bricksHeight);
				ctx.fillStyle = 'yellow';
				ctx.fill();
				ctx.closePath();
			}
		}
	} 
}; 

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx. closePath();
};

function drawBall(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0 , Math.PI * 2);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.closePath();
	x += dx;
	y += dy;
};

};