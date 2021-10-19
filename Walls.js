class Walls {

    constructor(x, y, x2, y2) {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.xMidPoint = (x + x2) / 2;
        this.yMidPoint = (y + y2) / 2;
        this.theta = Math.atan2(this.yMidPoint, this.xMidPoint)
    }

    drawWalls(width, colour) {
        c.beginPath();
        c.lineWidth = width
        c.strokeStyle = colour
        c.moveTo(this.x, this.y);
        c.lineTo(this.x2, this.y2);
        c.stroke();
    }
}