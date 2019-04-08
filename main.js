let canvas = document.getElementById('main');
let c = canvas.getContext('2d');
canvas.width = innerWidth-20;
canvas.height = innerHeight-20;

let mpos;
let player;
let foods = [];

let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function colorRandom(){
    return colorArray[Math.floor(Math.random()*colorArray.length)];
}

function init() {

mpos = new Vector(canvas.width/2, canvas.height/2);

    for( let i = 0; i < 100; i ++){
        foods.push(new Food(Math.random()*canvas.width, Math.random()*canvas.height, 10, colorRandom()));
    }
    player = new Player(canvas.width/2, canvas.height/2, 25, colorRandom());
    update();
}

function update() {
    c.clearRect(0,0,canvas.width, canvas.height);

    for(let i = 0; i < foods.length; i++){
        foods[i].draw(c);
    }
    player.draw(c);

    requestAnimationFrame(update);
}

window.addEventListener('load', function() {
    init();
    window.addEventListener('mousemove', function(event){
        mpos.x = event.clientX - canvas.offsetLeft;
        mpos.y = event.clientY - canvas.offsetTop;
        console.log(mpos.toString());
    });
});
