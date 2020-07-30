function Canvas2D(){
	this._canvas = document.querySelector('#myCanvas');
	this._canvasContext = this._canvas.getContext('2d');
}

Canvas2D.prototype.clear = function(){
	this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.drawText = function(text, position, color = "#000", size = 20, align = 'start', stroke = false){
	this._canvasContext.fillStyle = color;
	this._canvasContext.font = `${size}px sans-serif`;
	this._canvasContext.textAlign = align;
	if(stroke){
		this._canvasContext.strokeText(text, position.x, position.y);
	}else{
		this._canvasContext.fillText(text, position.x, position.y);
	}
}

Canvas2D.prototype.drawRect = function(rect, size, color){
	this._canvasContext.fillStyle = color;
	this._canvasContext.fillRect(rect.x, rect.y, size, size);
}

Canvas2D.prototype.drawLine = function(x1, y1, x2, y2, color = 'black', width = 1){
	this._canvasContext.beginPath();
	this._canvasContext.strokeStyle = color;
	this._canvasContext.strokeWidth = width;
	this._canvasContext.moveTo(x1, y1);
	this._canvasContext.lineTo(x2, y2);
	this._canvasContext.stroke();
}