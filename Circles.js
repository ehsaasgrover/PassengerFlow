class Circles {
    constructor(x, y, radius, colour, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    drawCircle() {
        c.beginPath();
        c.fillStyle = this.colour;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fill();
        c.closePath();


        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.x += step.x;
        this.y += step.y;
    }



}