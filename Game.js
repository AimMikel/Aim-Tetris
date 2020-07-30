const SIZE = 25;
const XMAX = SIZE * 12;
const YMAX = SIZE * 24;
let grid = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

const color = {
	j: 'slategray',
	l: 'darkgoldenrod',
	o: 'indianred',
	s: 'forestgreen',
	t: 'cadetblue',
	z: 'hotpink',
	i: 'sandybrown'
}

function Game(){
	this.score = 0;
	this.speed = 1;
	this.time = 0;
	this.lastTime = 0;
	this.delta = 0;
	this.state = 'start';
	this.position = {x: XMAX / 2, y: 0};
	this.canvas = new Canvas2D();
	this.form = new Form();
	this.next = new Form();
	this.moveLeft = false;
	this.moveRight = false;
	this.rotate = false;
	this.accelerate = false;
}

Game.prototype.handleState = function(){
	switch(game.state){
		case 'start':
		case 'paused':
			game.state = 'playing';
			break;
		case 'playing':
			game.state = 'paused';
			break;
		case 'over':
			grid = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
			game.form.create();
			score = 0;
			game.state = 'playing';
			break;
	}
	game.drawStates();
}

Game.prototype.handleKeyDown = function(e){
	switch(e.keyCode){
		case 32:
			game.handleState();
			break;
		case 37:
			game.moveLeft = game.form.canMove('left');
			break;
		case 38:
			game.rotate = true;
			break;
		case 39:
			game.moveRight = game.form.canMove('right');
			break;
		case 40:
			game.accelerate = true;
			break;
	}
}

Game.prototype.handleKeyUp = function(e){
	switch(e.keyCode){
			case 37:
				
				break;
			case 38:
				game.rotate = false;
				break;
			case 39:
				
				break;
			case 40:
				game.accelerate = false;
				break;
		}
}

Game.prototype.init = function(){
	game.drawStates();
}

Game.prototype.start = function(){
	document.onkeydown = game.handleKeyDown;
	document.onkeyup = game.handleKeyUp;
	game.init();
	requestAnimationFrame(game.mainLoop);
}



Game.prototype.mainLoop = function(deltaTime){
	if(game.lastTime !== 0){
		game.delta = deltaTime - game.lastTime;
	}
	game.lastTime = deltaTime
	if(game.state === 'playing'){
		game.update();
		game.draw();
	}
	requestAnimationFrame(game.mainLoop);
}

Game.prototype.update = function(delta){
	if(game.moveRight){
		game.form.moveRight();
		game.moveRight = false;
	}else if(game.moveLeft){
		game.form.moveLeft();
		game.moveLeft = false;
	}
	if(game.rotate){
		game.form.rotate();
		game.rotate = false;
	}
	if(game.form.canMove('down')){
		game.position.y += (game.delta / 16) * (game.speed * (game.accelerate ? 5 : 1));
	}else{
		if(game.position.y > 0){
			game.form.render();
			game.position = {x: XMAX / 2, y: 0};
			game.form = game.next;
			game.next = new Form();
			game.renderAvail();
		}else{
			game.score = 0;
			game.level = 1;
			game.time = 0;
			game.state = 'over';
			game.drawStates();
		}
	}
	game.checkScore();
}

Game.prototype.draw = function(){
	game.canvas.clear();
	game.renderAvail();
	game.canvas.drawLine(XMAX, 0, XMAX, YMAX);
	game.canvas.drawLine(XMAX, 150, XMAX + 150, 150);
	game.drawScore();
	game.form.draw();
	game.next.draw({x: XMAX + 75, y: 25}); 
	if(game.state !== 'playing'){
		game.drawStates();
	}
}

Game.prototype.renderAvail = function(){
	grid.forEach((row, rowIndex)=>{
		row.forEach((col, colIndex)=>{
			if(grid[rowIndex][colIndex]){
				game.canvas.drawRect({x:colIndex * SIZE, y:rowIndex * SIZE}, SIZE - 1, color[grid[rowIndex][colIndex]]);
			}
		});
	});
}

Game.prototype.checkScore = function(){
	grid.forEach((row, rowIndex)=>{
		if(row.length == 12){
			let full = 0;
			row.forEach(col=>{
				if(col !== undefined){
					full++;
				}
			});
			if(full === 12){
				grid.splice(rowIndex, 1);
				grid.unshift([]);
				game.score += 10;
				game.draw();
			}
		}
	});
}

Game.prototype.drawScore = function(){
	game.canvas.drawText(`Time ${game.time}`, {x: XMAX + 10, y: 190}, '#432452', 20);
	game.canvas.drawText(`Score ${game.score}`, {x: XMAX + 10, y: 220}, '#006699', 20);
	game.canvas.drawText(`Level ${game.speed}`, {x: XMAX + 10, y: 250}, 'green', 25);
}

Game.prototype.drawStates = function(){
	if(game.state === 'start'){
		game.canvas.drawText("Start Game", {x:(XMAX + 150) / 2, y:250}, "green", 60, 'center');
		game.canvas.drawText("Press space bar to start game", {x:(XMAX + 150) / 2, y:300}, "cadetblue", 20, 'center');
	}else if(game.state === 'paused'){
		game.canvas.drawText("Paused", {x: XMAX / 2, y:250}, "green", 60, 'center');
	}else if(game.state === 'over'){
		game.canvas.drawText("Game Over", {x: (XMAX + 150) / 2, y:250}, "red", 60, 'center');
		game.canvas.drawText("Press space bar to start game", {x:(XMAX + 150) / 2, y:300}, "cadetblue", 20, 'center');
	}
}

let game = new Game();
game.start();