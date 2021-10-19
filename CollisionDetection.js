let circle1 = new Circles(130, 500, 20, 'red', 1, 1);
let circle2 = new Circles(175, 500, 20, 'orange', 2, 0.5);
let circle3 = new Circles(220, 500, 20, 'lightgreen',2,1);
let circle4 = new Circles(240, 500, 20, 'aqua',2,1);
let circle5 = new Circles(230,400,20, 'purple',2,1);

let funnelBottomLeft = new Walls(100, 500, 200, 350);
let funnelBottomRight = new Walls(300, 350, 400, 500);
let funnelLeft = new Walls(300, 100, 300, 350);
let funnelRight = new Walls(200, 100, 200, 350);
let target = new Walls(180,80,320,80);

let finalTarget = {x:50, y:-100};
let dot;
const allCircles = [circle1, circle2, circle3, circle4, circle5];
const allFunnelWalls = [funnelBottomLeft, funnelBottomRight, funnelLeft, funnelRight];

let step = goToTarget({x: finalTarget.x - circle1.x, y: finalTarget.y - circle1.y});

//getting the distance between two points [works]
function dist(x1, y1, x2, y2){

    let distX = x2 - x1;
    let distY = y2 - y1;

    return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
}

// LINE/CIRCLE
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    let inside1 = pointCircle(x1,y1, cx,cy,r);
    let inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2){
        return true;
    }

    // get length of the line
    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = Math.hypot(distX, distY);

    // gets dot product of the line and position of the circle
    dot = (((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

    // find the closest point on the line from the circle
    let closestX = x1 + (dot * (x2-x1));
    let closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    let onLine = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onLine) return false;

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;

    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    return distance <= r;

}

//POINT/CIRCLE [Works]
function pointCircle(px, py, cx, cy, r) {
    let distX;
    let distY;

    // get distance between the endPoint and circle's center using the Pythagorean Theorem
    if(px > cx ){
        distX = px - cx;
    }
    if(py > cy) {
        distY = py - cy;
    }
    if(cx > px){
        distX = cx - px;
    }
    if(cy > py){
        distY = cy - py;
    }

    let distance = Math.hypot(distX, distY);

    // if the distance is less than the circle's radius the point is inside!
    return distance <= r;

}

// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

    // get distance from the point to the two ends of the line
    let d1 = dist(px,py, x1,y1);
    let d2 = dist(px,py, x2,y2);

    console.log("d1: " + d1 + " d2: " + d2)
    let d3 = d1 + d2;

    // get the length of the line
    let lineLen = dist(x1,y1, x2,y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    let buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    return d3 >= lineLen-buffer && d3 <= lineLen+buffer;
}

//collision detection of innerWalls + Circles
function collide(array, array2, index){

    for(let i = 0; i<allFunnelWalls.length; i++){

        let dx = array[index].x - array2[i].xMidPoint;
        let dy = array[index].y - array2[i].yMidPoint;
        let theta = Math.atan2(dy, dx);
        let dx_ = Math.cos(theta) * dx + Math.sin(theta) * dy;
        let dy_ = -Math.sin(theta) * dx + Math.cos(theta) * dy;

        let velx = Math.cos(theta) * array[index].xSpeed + Math.sin(theta) * array[index].ySpeed;
        let vely = -Math.sin(theta) * array[index].xSpeed + Math.cos(theta) * array[index].ySpeed;


        // Collision detection algorithm between circles + inner walls
        let collision1 = lineCircle(array2[i].x, array2[i].y, array2[i].x2, array2[i].y2,
            array[index].x, array[index].y, array[index].radius);

        // Collision detection
        if(collision1){

            // array[index].colour = "green";
            array[index].xSpeed = -array[index].xSpeed;
            array[index].ySpeed = -array[index].ySpeed;
            return true;

        }
    }

}

function circleTargetCollision(allCircles, target, index) {
    //Collision detection algorithm between circles + inner walls
    let collision1 = lineCircle(target.x, target.y, target.x2, target.y2,
        allCircles[index].x, allCircles[index].y, allCircles[index].radius);

    //Collision detection
    if (collision1) {
        allCircles[index].colour = "#fff";
        allCircles[index].xSpeed = 0
        allCircles[index].ySpeed = 0
        allCircles[index].x = 0;
        return true;
    }
}



//outerWallCollision
function outerWallCollision() {
    for (let i = 0; i < allCircles.length; i++) {

        //Collision detection of RHS outerWall
        if (allCircles[i].x + allCircles[i].radius > canvas.width) {
            allCircles[i].xSpeed = -allCircles[i].xSpeed;

        }

        //Collision detection of LHS outerWall
        if(allCircles[i].x + allCircles[i].radius < allCircles[i].radius * 2){
            allCircles[i].xSpeed = -allCircles[i].xSpeed;

        }

        //Collision detection of bottom
        if ((allCircles[i].y + allCircles[i].radius) > canvas.height ) {
            allCircles[i].ySpeed = -allCircles[i].ySpeed;
        }

        //Collision detection of top
        if (allCircles[i].y + allCircles[i].radius <  allCircles[i].radius * 2) {
            allCircles[i].ySpeed = -allCircles[i].ySpeed;

        }
    }
}

//innerWall Collision
function innerWallCollision() {
    collide(allCircles, allFunnelWalls, 0);
    collide(allCircles, allFunnelWalls, 1);
    collide(allCircles, allFunnelWalls, 2);
    collide(allCircles, allFunnelWalls, 3);
    collide(allCircles, allFunnelWalls, 4);


    circleTargetCollision(allCircles, target, 0);
    circleTargetCollision(allCircles, target, 1);
    circleTargetCollision(allCircles, target, 2);
    circleTargetCollision(allCircles, target, 3);
    circleTargetCollision(allCircles, target, 4);
}

//ballCollision
function ballCollision(){
    for(let i = 0; i<allCircles.length; i++)
    {
        for(let j = i+1; j < allCircles.length; j++) {
            if ((Math.abs(allCircles[i].x - allCircles[j].x) < (allCircles[i].radius + allCircles[j].radius))
                && (Math.abs(allCircles[i].y - allCircles[j].y) < (allCircles[i].radius + allCircles[j].radius))) {
                allCircles[i].xSpeed = -allCircles[i].xSpeed;
                allCircles[i].ySpeed = -allCircles[i].ySpeed;

                allCircles[j].xSpeed = -allCircles[j].xSpeed;
                allCircles[j].ySpeed = -allCircles[j].ySpeed;

            }
        }
    }
}

function goToTarget(v) {
    let length = (Math.sqrt(v.x * v.x + v.y * v.y));
    return{x: v.x / length, y: v.y /length};
}

//Animation Loop
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
    target.drawWalls();

    outerWallCollision();
    innerWallCollision();
    ballCollision();
}

animate();
