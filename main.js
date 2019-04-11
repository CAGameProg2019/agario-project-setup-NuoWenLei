let canvas = document.getElementById('main');
let c = canvas.getContext('2d');
canvas.width = innerWidth-20;
canvas.height = innerHeight-20;

let mpos;
let player = [];
let vel = [];
let eatVal;
let mP1 = new Vector(0,0);
let name;

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

function stopPlayer(i){
	for(i = 0; i<player.length; i++){
		if(player[i].dist(mP1.x, mP1.y, player[i].x, player[i].y) >= player[i].dist(mP1.x, mP1.y, mpos.x, mpos.y)){
			vel[i].x = 0;
			vel[i].y = 0;
		}
	}

}

function velocity(){
	for(i = 0; i<player.length; i++){
		vel[i].x = (mpos.x-player[i].x)/(player[i].radius*2);
		vel[i].y = (mpos.y-player[i].y)/(player[i].radius*2);
		mP1.x = player[i].x
		mP1.y = player[i].y;
	}


}

function eat(index){
	let retNum;
	for (let i = 0; i<player.length; i++){
		if(player[i].dist(player[i].x, player[i].y, foods[index].x, foods[index].y) <= player[i].radius+foods[index].radius){
			retNum = i;
			break;
		} else {
			retNum = false;
			break;
		}

	}
	return retNum;


}


function init() {
	vel.push(new Vector(0,0));
	mpos = new Vector(canvas.width/2, canvas.height/2);

	name = prompt("Enter Name:");

    for( let i = 0; i < 100; i ++){
        foods.push(new Food(Math.random()*canvas.width, Math.random()*canvas.height, 10, colorRandom()));
    }
    player.push(new Player(canvas.width/2, canvas.height/2, 25, colorRandom(), name, 0));
    update();
}

function update() {


    c.clearRect(0,0,canvas.width, canvas.height);

    for(let i = 0; i < foods.length; i++){

		eatVal = eat(i);
		console.log(eatVal);
		if(eatVal === 0){
			console.log('hi');
			player[eatVal].radius++;
			foods.splice(i, 1);
			foods.push(new Food(Math.random()*canvas.width, Math.random()*canvas.height, 10, colorRandom()));
			i--;

		}
		foods[i].update(c);

    }


	stopPlayer();
	// console.log(velVec);
    for(i = 0; i< player.length; i++){
		player[i].update(c);
	}


    requestAnimationFrame(update);
}

window.addEventListener('load', function() {
    init();
    window.addEventListener('mousemove', function(event){
        mpos.x = event.clientX - canvas.offsetLeft;
        mpos.y = event.clientY - canvas.offsetTop;
		velocity();


    });
	window.addEventListener('keydown', function(event){
		if(event.key == 'w'){

		}
	})
});
