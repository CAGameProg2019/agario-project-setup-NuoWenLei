let canvas = document.getElementById('main');
let c = canvas.getContext('2d');
canvas.width = innerWidth-20;
canvas.height = innerHeight-20;

let mpos;
let player = [];
let vel = [];
let eatVal;
let mP = [];
let name;
let repels = [];
const FEEDDISTANCE = 200;

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

function stopPlayer(){
	for(i = 0; i<player.length; i++){
		if(player[i].dist(mP[i].x, mP[i].y, player[i].x, player[i].y) >= player[i].dist(mP[i].x, mP[i].y, mpos.x, mpos.y)){
			vel[i].x = 0;
			vel[i].y = 0;
		}
	}

}

function shoot(vec){
	player.push(new Player(player[0].x, player[0].y, player[0].radius/2, player[0].color, name, 1));
	player[1].addVector(vec);
	vel.push(new Vector(0,0));
	mP.push(new Vector(0,0));
	repels.push(new Vector(0,0));

}

function velocity(){
	for(i = 0; i<player.length; i++){
		mP[i].x = player[i].x;
		mP[i].y = player[i].y;



		vel[i].x = (mpos.x-player[i].x)/(player[i].radius*2);
		vel[i].y = (mpos.y-player[i].y)/(player[i].radius*2);
	}
	if(player[0].dist(player[0].x, player[0].y, player[1].x, player[1].y) <= player[0].radius+player[1].radius){
		if(player[0].x >= player[1].x){
			if(player[0].y >= player[1].y){
				repels[0].x = Math.abs(vel[0].x);
				repels[0].y = Math.abs(vel[0].y);
				repels[1].x = Math.abs(vel[1].x);
				repels[1].y = Math.abs(vel[1].y);
				player[0].addVector(repels[0]);
				player[1].subVector(repels[1]);
			}
			if(player[0].y <= player[1].y){
				repels[0].x = Math.abs(vel[0].x);
				repels[0].y = -1 * Math.abs(vel[0].y);
				repels[1].x = Math.abs(vel[1].x);
				repels[1].y = Math.abs(vel[1].y);
				player[0].addVector(repels[0]);
				player[1].subVector(repels[1]);
			}
		}else if(player[0].x <= player[1].x){
			if(player[0].y >= player[1].y){
				repels[0].x = Math.abs(vel[0].x);
				repels[0].y = Math.abs(vel[0].y);
				repels[1].x = Math.abs(vel[1].x);
				repels[1].y = Math.abs(vel[1].y);
				player[0].addVector(repels[0]);
				player[1].subVector(repels[1]);
			}
			if(player[0].y <= player[1].y){
				repels[0].x = Math.abs(vel[0].x);
				repels[0].y = -1 * Math.abs(vel[0].y);
				repels[1].x = Math.abs(vel[1].x);
				repels[1].y = Math.abs(vel[1].y);
				player[0].addVector(repels[0]);
				player[1].subVector(repels[1]);
			}
		}
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
		}

	}
	return retNum;


}



function init() {
	vel.push(new Vector(0,0));
	mpos = new Vector(canvas.width/2, canvas.height/2);
	mP.push(new Vector(0,0));
	name = prompt("Enter Name:");
	repels.push(new Vector(0,0));

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
		// console.log(eatVal);
		foods[i].update(c);
		if(eatVal === 0 || eatVal === 1){
			console.log(eatVal);

			player[eatVal].radius++;
			foods.splice(i, 1);
			foods.push(new Food(Math.random()*canvas.width, Math.random()*canvas.height, 10, colorRandom()));
			i--;

		}


    }


	stopPlayer();
	// console.log(velVec);
    for(i = 0; i< player.length; i++){
		player[i].update(c);
	}
	if(player.length > 1){
		setTimeout(function(){
			player[0].radius += player[1].radius;
			player.splice(1,1);
			vel.splice(1,1);
			repels.splice(1,1);
			mP.splice(1,1);

		}, 10000);
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
			if(player.length == 1){
				shoot(player[0].feed(mpos, FEEDDISTANCE));
				player[0].radius /= 2;
			}

		}
	})
});
