function Graph(canvas) {
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    console.log('The graph is', this.width, 'wide and', this.height, 'tall');
}

// Draw graphs
Graph.prototype.drawBar = function(start, w, h, color) {
    this.context.fillStyle = color || 'black';
    if (this.mask === true) {
        this.context.fillRect(start, 0, w, this.height - h);
    } else {
        this.context.fillRect(start, this.height - h, w, h);
    }
};
Graph.prototype.drawLine = function(start, w, h, color) {
    this.context.fillStyle = color || 'black';
    this.lineThickness = 2;
    if (this.mask === true) {
        this.context.fillRect(start, 0, w, this.height - h - this.lineThickness);
        this.context.fillRect(start, this.height - h + this.lineThickness, w, h);
    } else {
        this.context.fillRect(start, this.height - h - this.lineThickness, w, this.lineThickness * 2);
    }
};

Graph.prototype.stroke = function() {
    this.context.stroke();
}
Graph.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
};
