class Walls {

    constructor(x, y, x2, y2) {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
    }

    drawWalls() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x2, this.y2);
        c.stroke();
    }
}