let canvas = document.getElementById('main');
let c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x:0,
    y:0
}
let pos = new Vector(5, 7);
let vel = new Vector(1, 1);

function init() {
    console.log(pos.toString());
    vel.scale(2);
    console.log(vel.toString()); // <2, 2>
    pos.subVector(vel);
    console.log(pos.toString());  // <3, 5>
    update();
}

function update() {
    c.clearRect(0,0,canvas.width, canvas.height);

    pos.addVector(vel);

    c.beginPath();
    c.arc(pos.x, pos.y, 50, 0, Math.PI*2, false);
    c.stroke();

    requestAnimationFrame(update);
}

window.addEventListener('load', function(event) {
    init();
});
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})
