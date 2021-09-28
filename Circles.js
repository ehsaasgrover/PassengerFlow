class Circles {
    constructor(x, y, radius, colour, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.speed = speed;
    }

    drawCircle() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.colour;
        c.fill();
        c.closePath();
        this.x += this.speed + 1;
        this.y += this.speed;

        // TODO: Implement circle movement within funnel only.
    }
}