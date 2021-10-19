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
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.colour;
        c.fill();
        c.closePath();

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        //Hardcode to get circles to move through funnel
        // this.x += this.xSpeed;
        // if (this.x === 240) {
        //     this.xSpeed = 0;
        //     this.y += -1.5;
        // }

    }

}