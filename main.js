function sinus() {
	var canvas    = document.getElementById("sinus"),
		c         = canvas.getContext("2d");
	canvas.width = 1000;
	canvas.height = 500;
	var fps = 500;
	var x = 0, i = 0, j = 0, tmp = 0;
	function update() {
		x++;
	}
	function draw() {
		c.strokeStyle = "black";
		c.lineWidth = 5;
		if (x%150 == 0) {
			if (i != 250 && j != 250) {
				c.beginPath();
				c.moveTo(x, 400-i);
				c.lineTo(x, 400-i-1);
				c.stroke();
				i++;
				x--;
			}
			if (i == 250 && j != 250)//x%150, i=250
			{
				c.beginPath();
				c.moveTo(x+j/5, 150+j);
				c.lineTo(x+(j+1)/5, 150+j+1);
				c.stroke();
				j++;
				x--;							
			}
			if (i == 250 && j == 250) {
				x--;
				x += 50;
				i = 0;
				j = 0;
			}
		}
		else {
			c.beginPath();
			c.moveTo(x, 400);
			c.lineTo(x+1, 400);
			c.stroke();
		}
	}
	setInterval(function() {
		update();
		draw();
	}, 1000/fps);
}

function ball1() {
	var canvas	= document.getElementById("ball1"),
		c		= canvas.getContext("2d");
	canvas.width = 500;
	canvas.height = 400;
	var i = 50, direction = true;
	//arc(x, y, radius, startAngle, endAngle, anticlockwise)
	/*ball = new Object();
	ball.x = 0;
	ball.y = 300;
	ball.r = 50;*/
	
	var ball = {
		x: 0,
		y: 300,
		r: 50
	};
	function setDirection() {
		if (i == canvas.width - ball.r)
			direction = false;
		else if (i == 0 + ball.r)
			direction = true;
	}
	function update() {
		setDirection();
		if (direction == true)
			i++;
		else
			i--;
		ball.x = i;
	}
	function render() {
		c.clearRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = "black";
		c.beginPath();
		c.arc(ball.x, ball.y, ball.r, 0, 2* Math.PI, true);
		c.fill();
	}
	setInterval(function() {
		update();
		render();
	}, 1/100);
}

function ball2() {
	var canvas	= document.getElementById("ball2"),
		c		= canvas.getContext("2d");
	canvas.width = 500;
	canvas.height = 600;
	var i = 50, j = 50, directionX = true, directionY = true;
	//arc(x, y, radius, startAngle, endAngle, anticlockwise)
	/*ball = new Object();
	ball.x = 0;
	ball.y = 300;
	ball.r = 50;*/
	
	var ball = {
		x: 0,
		y: 300,
		r: 10
	};
	
	var player = {
		x: 100,
		y: 550,
		width: 100,
		height: 10
	};
	/*function collision() {
		// соприкосновение с полом
		if (ball.y + ball.r == canvas.height)
			ball.y = -ball.y;
		// соприкосновение с потолком
		if (ball.y - ball.r == 0)
			ball.y = -ball.y;
		// соприкосновение с правой стороной
		if (ball.x + ball.r == canvas.width)
			ball.x = -ball.x;
		// соприкосновение с левой стороной
		if (ball.x - ball.r == 0)
			ball.x = -ball.x;
	}*/
	function setDirectionX() {
		if (i == canvas.width - ball.r)
			directionX = false;
		else if (i == 0 + ball.r)
			directionX = true;
	}
	function setDirectionY() {
		if (j == player.y - ball.r && i >= player.x && i <= player.x + player.width)
			directionY = false;
		if (j == canvas.height - ball.r)
			directionY = false;
		else if (j == 0 + ball.r)
			directionY = true;
	}
	function move() {
		var keys = [];
		window.addEventListener("keydown", function(e) {
			keys[e.keyCode] = true;
		}, false);
		window.addEventListener("keyup", function(e) {
			delete keys[e.keyCode];
		}, false);
		if (keys[37])
			player.x --;
		else if (keys[39])
			player.x ++;
	}
	function move1() {
		window.onkeydown = function(e) {
		   var key = e.keyCode ? e.keyCode : e.which;
		   if (key == 37) {
			   player.x -= 10;
		   }else if (key == 39) {
			   player.x += 10;
		   }
		}
	}
	function update() {
		move1();
		setDirectionX();
		setDirectionY();
		if (directionX == true)
			i++;
		else
			i--;
		if (directionY == true)
			j+=2;
		else
			j-=2;
		ball.x = i;
		ball.y = j;
	}
	function render() {
		c.clearRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = "black";
		c.strokeRect(0, 0, canvas.width, canvas.height);
		c.beginPath();
		c.arc(ball.x, ball.y, ball.r, 0, 2* Math.PI, true);
		c.fill();
		c.fillRect(player.x, player.y, player.width, player.height);
	}
	setInterval(function() {
		update();
		render();
	}, 1/100);
}

window.onload = function() {
	sinus();
	ball1();
	ball2();
}