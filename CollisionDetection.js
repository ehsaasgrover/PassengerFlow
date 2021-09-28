circle1 = new Circles(130, 500, 20, 'red', 2);
circle2 = new Circles(175, 500, 20, 'orange', 2);
circle3 = new Circles(220, 500, 20, 'lightgreen', 2);
circle4 = new Circles(265, 500, 20, 'aqua', 2);
circle5 = new Circles(310, 500, 20, 'magenta', 2);

funnelBottomLeft = new Walls(100, 500, 200, 350);
funnelBottomRight = new Walls(300, 350, 400, 500);
funnelLeft = new Walls(300, 100, 300, 350);
funnelRight = new Walls(200, 100, 200, 350);

const allCircles = [circle1, circle2, circle3, circle4, circle5];
const allFunnelWalls = [funnelBottomLeft, funnelBottomRight, funnelLeft, funnelRight];

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    circle1.drawCircle();
    circle2.drawCircle();
    circle3.drawCircle();
    circle4.drawCircle();
    circle5.drawCircle();

    funnelBottomLeft.drawWalls();
    funnelBottomRight.drawWalls();
    funnelLeft.drawWalls();
    funnelRight.drawWalls();

    outerWallCollision();
    funnelCollision();
}

function outerWallCollision() {
    for (let i = 0; i < allCircles.length; i++) {
        if (allCircles[i].x > canvas.width - allCircles[i].radius || allCircles[i].x < allCircles[i].radius) {
            allCircles[i].speed = -allCircles[i].speed;
        }

        if (allCircles[i].y > canvas.height - allCircles[i].radius || allCircles[i].y < allCircles[i].radius) {
            allCircles[i].speed = -allCircles[i].speed;
        }
    }
}

function funnelCollision() {
    let distance;

    // Collision detection algorithm between circles + funnel walls
    for (let i = 0; i < allFunnelWalls.length; i++) {
        const lineEndPointX = allFunnelWalls[i].x;
        const lineEndPointY = allFunnelWalls[i].y;
        const lineEndPointX2 = allFunnelWalls[i].x2;
        const lineEndPointY2 = allFunnelWalls[i].y2;
        const lineLengthX = lineEndPointX2 - lineEndPointX;
        const lineLengthY = lineEndPointY2 - lineEndPointY;

        for (let j = 0; j < allCircles.length; j++) {
            const lineCircleDistanceX = allCircles[j].x - lineEndPointX;
            const lineCircleDistanceY = allCircles[j].y - lineEndPointY;

            const closestPointToCircle = (lineCircleDistanceX * lineLengthX + lineCircleDistanceY * lineLengthY)
                / (lineLengthY * lineLengthY + lineLengthX * lineLengthX);

            if (closestPointToCircle >= 0 && closestPointToCircle <= 1) {
                distance = (lineEndPointX + lineLengthX * closestPointToCircle - allCircles[j].x) ** 2
                    + (lineEndPointY + lineLengthY * closestPointToCircle - allCircles[j].y) ** 2;
            } else {
                distance = closestPointToCircle < 0 ?
                    (lineEndPointX - allCircles[j].x) ** 2 + (lineEndPointY - allCircles[j].y) ** 2 :
                    (lineEndPointX2 - allCircles[j].x) ** 2 + (lineEndPointY2 - allCircles[j].y) ** 2;
            }
            const result = distance < allCircles[j].radius * allCircles[j].radius;

            if (result) {
                allCircles[j].speed = -allCircles[j].speed;
            }
        }
    }
}

// TODO: Collision with other balls
//       Create path for balls

animate();



