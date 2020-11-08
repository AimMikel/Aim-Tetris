function round(num, to){
	//return (num - (num % to) + (((num % to) >= (to / 2)) ? to : 0));
	return (num - (num % to));

}
function Form(){
	this.elems = {};
	this.create();
}

Form.prototype.create = function(){
	let rand = Math.random() * 105;
	if(rand < 15){
		this.name = 'j';
		this.elems.a = {x: 0, y: 0};
		this.elems.b = {x: 0, y: 1};
		this.elems.c = {x:-1, y: 2};
		this.elems.d = {x: 0, y: 2};
	}else if(rand < 30){
		this.name = 'l';
		this.elems.a = {x:-1, y: 0};
		this.elems.b = {x:-1, y: 1};
		this.elems.c = {x:-1, y: 2};
		this.elems.d = {x: 0, y: 2};
	}else if(rand < 45){
		this.name = 'o';
		this.elems.a = {x:-1, y: 0};
		this.elems.b = {x: 0, y: 0};
		this.elems.c = {x:-1, y: 1};
		this.elems.d = {x: 0, y: 1};
	}else if(rand < 60){
		this.name = 's';
		this.elems.a = {x: 0, y: 0};
		this.elems.b = {x: 1, y: 0};
		this.elems.c = {x:-1, y: 1};
		this.elems.d = {x: 0, y: 1};
	}else if(rand < 75){
		this.name = 't';
		this.elems.a = {x: 0, y: 0};
		this.elems.b = {x:-1, y: 1};
		this.elems.c = {x: 0, y: 1};
		this.elems.d = {x: 1, y: 1};
	}else if(rand < 90){
		this.name = 'z';
		this.elems.a = {x:-1, y: 0};
		this.elems.b = {x: 0, y: 0};
		this.elems.c = {x: 0, y: 1};
		this.elems.d = {x: 1, y: 1};
	}else{
		this.name = 'i';
		this.elems.a = {x:-2, y: 0};
		this.elems.b = {x:-1, y: 0};
		this.elems.c = {x: 0, y: 0};
		this.elems.d = {x: 1, y: 0};
	}
	this.didMove = false;
	this.mode = 1;
}

Form.prototype.draw = function(pos){
	if(!pos){
		pos = {x: round(game.position.x, SIZE), y: round(game.position.y, SIZE)};
	}
	for(let elem in this.elems){
		game.canvas.drawRect({x: pos.x + this.elems[elem].x * SIZE, y: pos.y + this.elems[elem].y * SIZE}, SIZE - 1 , color[this.name]);
	}
}

Form.prototype.canMove = function(dir){
	let move_a, move_b, move_c, move_d, 
			pos = {x: round(game.position.x, SIZE) / SIZE, y: round(game.position.y, SIZE) / SIZE};
	switch(dir){
		case 'left':
			move_a = grid[pos.y + this.elems.a.y][(pos.x - 1) + this.elems.a.x];
			move_b = grid[pos.y + this.elems.b.y][(pos.x - 1) + this.elems.b.x];
			move_c = grid[pos.y + this.elems.c.y][(pos.x - 1) + this.elems.c.x];
			move_d = grid[pos.y + this.elems.d.y][(pos.x - 1) + this.elems.d.x];
			return !move_a && !move_b && !move_c && !move_d;
			break;
		case 'right':
			move_a = grid[pos.y + this.elems.a.y][pos.x + 1 + this.elems.a.x];
			move_b = grid[pos.y + this.elems.b.y][pos.x + 1 + this.elems.b.x];
			move_c = grid[pos.y + this.elems.c.y][pos.x + 1 + this.elems.c.x];
			move_d = grid[pos.y + this.elems.d.y][pos.x + 1 + this.elems.d.x];
			return !move_a && !move_b && !move_c && !move_d;
			break;
		case 'down':
			if(
					pos.y + this.elems.a.y + 1 <= 23 &&
					pos.y + this.elems.b.y + 1 <= 23 &&
					pos.y + this.elems.c.y + 1 <= 23 &&
					pos.y + this.elems.d.y + 1 <= 23
				){
				move_a = grid[pos.y + 1 + this.elems.a.y][pos.x + this.elems.a.x];
				move_b = grid[pos.y + 1 + this.elems.b.y][pos.x + this.elems.b.x];
				move_c = grid[pos.y + 1 + this.elems.c.y][pos.x + this.elems.c.x];
				move_d = grid[pos.y + 1 + this.elems.d.y][pos.x + this.elems.d.x];
				return !move_a && !move_b && !move_c && !move_d;
			}
			return false;
			break;
	}
}

Form.prototype.moveLeft = function(){
	let pos = {x: round(game.position.x, SIZE) / SIZE, y: round(game.position.y, SIZE) / SIZE};
	if(
		pos.x + this.elems.a.x - 1 >= 0 &&
		pos.x + this.elems.b.x - 1 >= 0 &&
		pos.x + this.elems.c.x - 1 >= 0 &&
		pos.x + this.elems.d.x - 1 >= 0 &&
		this.canMove('left')
	){
		game.position.x -= SIZE;
	}
}

Form.prototype.moveRight = function(){
	let pos = {x: round(game.position.x, SIZE) / SIZE, y: round(game.position.y, SIZE) / SIZE}; 
	if(
		pos.x + this.elems.a.x + 1 <= 11 &&
		pos.x + this.elems.b.x + 1 <= 11 &&
		pos.x + this.elems.c.x + 1 <= 11 &&
		pos.x + this.elems.d.x + 1 <= 11 &&
		this.canMove('right')
	){
		game.position.x += SIZE;
	}
}

Form.prototype.rotate = function(){
	let elems = this.elems, move_a, move_b, move_c, move_d, mode;
	switch(this.name){
		case 'j':
			switch(this.mode){
				case 1:
					move_a = canRotate(elems.a, 1, 1);
					move_b = canRotate(elems.b, 0, 1);
					move_c = canRotate(elems.c,-1, 0);
					move_d = canRotate(elems.d,-1, 1);
					mode = 2;
					break;
				case 2:
					move_a = canRotate(elems.a,-1, 2);
					move_b = canRotate(elems.b,-1, 1);
					move_c = canRotate(elems.c, 0, 0);
					move_d = canRotate(elems.d,-1, 0);
					mode = 3;
					break;
				case 3:
					move_a = canRotate(elems.a,-1, 0);
					move_b = canRotate(elems.b, 0, 0);
					move_c = canRotate(elems.c, 1, 1);
					move_d = canRotate(elems.d, 1, 0);
					mode = 4;
					break;
				case 4:
					move_a = canRotate(elems.a, 0, 0);
					move_b = canRotate(elems.b, 0, 1);
					move_c = canRotate(elems.c,-1, 2);
					move_d = canRotate(elems.d, 0, 2);
					mode = 1;
					break;
			}
			break;
		case 'l':
			switch(this.mode){
				case 1:
					move_a = canRotate(elems.a, 1, 0);
					move_b = canRotate(elems.b, 0, 0);
					move_c = canRotate(elems.c,-1, 0);
					move_d = canRotate(elems.d,-1, 1);
					mode = 2;
					break;
				case 2:
					move_a = canRotate(elems.a, 0, 2);
					move_b = canRotate(elems.b, 0, 1);
					move_c = canRotate(elems.c, 0, 0);
					move_d = canRotate(elems.d,-1, 0);
					mode = 3;
					break;
				case 3:
					move_a = canRotate(elems.a,-1, 1);
					move_b = canRotate(elems.b, 0, 1);
					move_c = canRotate(elems.c, 1, 1);
					move_d = canRotate(elems.d, 1, 0);
					mode = 4;
					break;
				case 4:
					move_a = canRotate(elems.a,-1, 0);
					move_b = canRotate(elems.b,-1, 1);
					move_c = canRotate(elems.c,-1, 2);
					move_d = canRotate(elems.d, 0, 2);
					mode = 1;
					break;
			}
			break;
		case 's':
			switch(this.mode){
				case 1:
					move_a = canRotate(elems.a, 0, 1);
					move_b = canRotate(elems.b, 0, 2);
					move_c = canRotate(elems.c,-1, 0);
					move_d = canRotate(elems.d,-1, 1);
					mode = 2;
					break;
				case 2:
					move_a = canRotate(elems.a, 0, 0);
					move_b = canRotate(elems.b, 1, 0);
					move_c = canRotate(elems.c,-1, 1);
					move_d = canRotate(elems.d, 0, 1);
					mode = 1;
					break;
			}
			break;
		case 'z':
			switch(this.mode){
				case 1:
					move_a = canRotate(elems.a, 0, 0);
					move_b = canRotate(elems.b, 0, 1);
					move_c = canRotate(elems.c,-1, 1);
					move_d = canRotate(elems.d,-1, 2);
					mode = 2;
					break;
				case 2:
					move_a = canRotate(elems.a,-1, 0);
					move_b = canRotate(elems.b, 0, 0);
					move_c = canRotate(elems.c, 0, 1);
					move_d = canRotate(elems.d, 1, 1);
					mode = 1;
					break;
			}
			break;
		case 'i':
			switch(this.mode){
				case 1:
					move_a = canRotate(elems.a,-1, 0);
					move_b = canRotate(elems.b,-1, 1);
					move_c = canRotate(elems.c,-1, 2);
					move_d = canRotate(elems.d,-1, 3);
					mode = 2;
					break;
				case 2:
					move_a = canRotate(elems.a,-2, 0);
					move_b = canRotate(elems.b,-1, 0);
					move_c = canRotate(elems.c, 0, 0);
					move_d = canRotate(elems.d, 1, 0);
					mode = 1;
					break;
			}
			break;

		case 't':
			switch(this.mode){
				case 1:
					move_a = canRotate(elems.a, 0, 1);
					move_b = canRotate(elems.b,-1, 0);
					move_c = canRotate(elems.c,-1, 1);
					move_d = canRotate(elems.d,-1, 2);
					mode = 2;
					break;
				case 2:
					move_a = canRotate(elems.a, 0, 1);
					move_b = canRotate(elems.b, 1, 0);
					move_c = canRotate(elems.c, 0, 0);
					move_d = canRotate(elems.d,-1, 0);
					mode = 3;
					break;
				case 3:
					move_a = canRotate(elems.a,-1, 1);
					move_b = canRotate(elems.b, 0, 2);
					move_c = canRotate(elems.c, 0, 1);
					move_d = canRotate(elems.d, 0, 0);
					mode = 4;
					break;
				case 4:
					move_a = canRotate(elems.a, 0, 0);
					move_b = canRotate(elems.b,-1, 1);
					move_c = canRotate(elems.c, 0, 1);
					move_d = canRotate(elems.d, 1, 1);
					mode = 1;
					break;
			}
			break;
	}

	function canRotate(box, dx, dy){
		let pos = {x: round(game.position.x, SIZE) / SIZE, y: round(game.position.y, SIZE) / SIZE};
		if(
				pos.y + dy <= 23 && pos.y + dy >= 0 &&
				pos.x + dx <= 11 && pos.x + dx >= 0 &&
				!grid[pos.y + dy][pos.x + dx]
			){
			return {x: dx, y: dy};
		}
		return false;
	}

	if(move_a && move_b && move_c && move_d){
		this.elems.a = move_a;
		this.elems.b = move_b;
		this.elems.c = move_c;
		this.elems.d = move_d;
		this.mode = mode;
	}
}

Form.prototype.render = function(){
	let pos = {x: round(game.position.x, SIZE) / SIZE, y: round(game.position.y, SIZE) / SIZE};
	grid[pos.y + this.elems.a.y][pos.x + this.elems.a.x] = this.name;
	grid[pos.y + this.elems.b.y][pos.x + this.elems.b.x] = this.name;
	grid[pos.y + this.elems.c.y][pos.x + this.elems.c.x] = this.name;
	grid[pos.y + this.elems.d.y][pos.x + this.elems.d.x] = this.name;
}
