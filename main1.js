let canvas = document.getElementById('main1');
let c = canvas.getContext('2d');
canvas.width = innerWidth-20;
canvas.height = innerHeight-20;

let mpos;
let player;
let vel;
let eatVal;
let foodNum = 1000;

let mP;

let name;

let boundaryThickness = 10;

let power = false;
let powerFoods = [];

let magnet = false;
let magnetFoods = [];

let dead = false;
let deathFoods = [];

let onRadar = [];
let powerTimeout;
// let trueX;
// let trueY;
let trueSpace = new Vector(5000,5000);
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

function boundary(){
	c.beginPath();
	c.moveTo(0-player.x+canvas.width/2, 0-player.y+canvas.height/2);
	c.lineTo(trueSpace.x-player.x+canvas.width/2, 0-player.y+canvas.height/2);
	c.lineTo(trueSpace.x-player.x+canvas.width/2, trueSpace.y-player.y+canvas.height/2);
	c.lineTo(0-player.x+canvas.width/2, trueSpace.y-player.y+canvas.height/2);
	c.lineTo(0-player.x+canvas.width/2, 0-player.y+canvas.height/2);
	c.closePath();
	c.lineWidth = boundaryThickness;
	c.stroke();
	if(player.x+player.radius >= trueSpace.x || player.x-player.radius <= 0 || player.y+player.radius >= trueSpace.y || player.y-player.radius <= 0){
		dead = true;
	}
}

function minimap(){
	c.fillStyle = 'rgba(49, 116, 158, 0.5)';
	c.fillRect((9*canvas.width)/10, canvas.height/20, 100, 100);
	c.beginPath();
	c.arc(((9*canvas.width)/10) + player.x/(trueSpace.x/100), (canvas.height/20) + player.y/(trueSpace.y/100), 5, 0, Math.PI*2, false);
	// console.log(player.x/(trueSpace.x/100), player.y/(trueSpace.y/100));
	c.closePath();
	c.fillStyle = player.color;
	c.fill();
	c.lineWidth = 1;
	c.stroke();
	if(!power && !magnet){
		for (let i = 0; i<powerFoods.length; i++){
			c.beginPath();
			c.arc(((9*canvas.width)/10) + powerFoods[i].x/(trueSpace.x/100), (canvas.height/20) + powerFoods[i].y/(trueSpace.y/100), 2, 0, Math.PI*2, false);
			c.closePath();
			c.fillStyle = powerFoods[i].color;
			c.fill();
			c.lineWidth = 0.1;
			c.stroke();
		}
		for (let i = 0; i<magnetFoods.length; i++){
			c.beginPath();
			c.arc(((9*canvas.width)/10) + magnetFoods[i].x/(trueSpace.x/100), (canvas.height/20) + magnetFoods[i].y/(trueSpace.y/100), 2, 0, Math.PI*2, false);
			c.closePath();
			c.fillStyle = magnetFoods[i].color;
			c.fill();
			c.lineWidth = 0.1;
			c.stroke();
		}


	}
	if(!magnet){
		for(let i of onRadar){
			c.fillStyle = deathFoods[i].color;
			c.lineWidth = 0.5;
			c.rect(((9*canvas.width)/10)+deathFoods[i].x/(trueSpace.x/100)-2, (canvas.height/20) + deathFoods[i].y/(trueSpace.y/100)-2, 4, 4);
			c.fill();
			c.stroke();
		}
	}



}

function deathPanel(){

	c.font = "50px Arial";
	c.textAlign = 'center';
	c.textBaseline = 'middle';
	c.beginPath();
	c.fillStyle = player.color;
	c.arc(canvas.width/2, canvas.height/2, player.radius, 0, Math.PI*2, false);
	c.fill();
	c.lineWidth = player.radius/40;
	c.stroke();
	c.lineWidth = 2.5;
	c.fillStyle = 'white';
	c.fillText("Radius: " + player.radius, canvas.width/2, canvas.height/2);
	c.strokeText("Radius: " + player.radius, canvas.width/2, canvas.height/2);
}

function deathFood(){
	onRadar = [];
	for (let i = 0; i < deathFoods.length; i++){
		deathFoods[i].draw(c, player);
		if(player.dist(player.x, player.y, deathFoods[i].x, deathFoods[i].y) <= 700){
			onRadar.push(i);
			let vel = new Vector(player.x, player.y);
	        vel.subVector(deathFoods[i]);
			vel.toDirVec();
			vel.scale(player.maxSpeed/2);
			deathFoods[i].addVector(vel);
			if(deathFoods[i].x+deathFoods[i].radius >= trueSpace.x || deathFoods[i].x-deathFoods[i].radius <= 0 || deathFoods[i].y+deathFoods[i].radius >= trueSpace.y || deathFoods[i].y-deathFoods[i].radius <= 0){
				deathFoods[i].x = Math.random()*trueSpace.x;
				deathFoods[i].y = Math.random() * trueSpace.y;
			}
			if(player.dist(player.x, player.y,deathFoods[i].x,deathFoods[i].y) <= player.radius + deathFoods[i].radius){
				dead = true;
			}

		}
	}
}

function magnetFood(){
	for(let i = 0; i<magnetFoods.length; i++){
		magnetFoods[i].draw(c, player);
		if(player.dist(player.x, player.y, magnetFoods[i].x, magnetFoods[i].y) <= 500){
			let vel = new Vector(player.x, player.y);
	        vel.subVector(magnetFoods[i]);
			vel.toDirVec();
			vel.scale(player.maxSpeed/2);
			magnetFoods[i].subVector(vel);
			if(magnetFoods[i].x+magnetFoods[i].radius >= trueSpace.x || magnetFoods[i].x-magnetFoods[i].radius <= 0 || magnetFoods[i].y+magnetFoods[i].radius >= trueSpace.y || magnetFoods[i].y-magnetFoods[i].radius <= 0){
				magnetFoods[i].x = Math.random()*trueSpace.x;
				magnetFoods[i].y = Math.random() * trueSpace.y;
			}
			if(player.dist(player.x, player.y,magnetFoods[i].x,magnetFoods[i].y) <= player.radius + magnetFoods[i].radius){
				player.radius++;
				magnet = true;
				powerTimer();
			}

		}

	}
}

function superFood(){
	for (let i = 0; i < powerFoods.length; i++){
		powerFoods[i].draw(c, player);
		if(player.dist(player.x, player.y, powerFoods[i].x, powerFoods[i].y) <= 500){
			let vel = new Vector(player.x, player.y);
	        vel.subVector(powerFoods[i]);
			vel.toDirVec();
			vel.scale(player.maxSpeed/2);
			powerFoods[i].subVector(vel);
			if(powerFoods[i].x+powerFoods[i].radius >= trueSpace.x || powerFoods[i].x-powerFoods[i].radius <= 0 || powerFoods[i].y+powerFoods[i].radius >= trueSpace.y || powerFoods[i].y-powerFoods[i].radius <= 0){
				powerFoods[i].x = Math.random()*trueSpace.x;
				powerFoods[i].y = Math.random() * trueSpace.y;
			}
			if(player.dist(player.x, player.y,powerFoods[i].x,powerFoods[i].y) <= player.radius + powerFoods[i].radius){
				player.radius++;
				power = true;
				powerTimer();
			}

		}
	}


}

function powerTimer(){
	powerTimeout = setTimeout(function(){
		power = false;
		magnet = false;
		for (let i = 0; i<powerFoods.length; i++){
			powerFoods[i].x = Math.random()*trueSpace.x;
			powerFoods[i].y = Math.random()*trueSpace.y;
			powerFoods[i].color = colorRandom();
		}

		resetTimer();
	}, 5000);
}
function resetTimer(){
	clearTimeout(powerTimeout);
}

// function stopPlayer(){
// 	if(player.dist(mP.x, mP.y, player.x, player.y) >= player.dist(mP.x, mP.y, mpos.x, mpos.y)){
// 		vel.x = 0;
// 		vel.y = 0;
// 	}
//
//
// }

// function shoot(vec){
// 	player.push(new Player(player[0].x, player[0].y, player[0].radius/2, player[0].color, name, 1));
// 	player[1].addVector(vec);
// 	vel.push(new Vector(0,0));
// 	mP.push(new Vector(0,0));
// 	repels.push(new Vector(0,0));
//
// }

// function velocity(){
//
// 	mP.x = player.x;
// 	mP.y = player.y;
//
//
//
// 	vel.x = (mpos.x-player.x)/(player.radius*2);
// 	vel.y = (mpos.y-player.y)/(player.radius*2);
// }

	// if(player[0].dist(player[0].x, player[0].y, player[1].x, player[1].y) <= player[0].radius+player[1].radius){
	// 	if(player[0].x >= player[1].x){
	// 		if(player[0].y >= player[1].y){
	// 			repels[0].x = Math.abs(vel[0].x);
	// 			repels[0].y = Math.abs(vel[0].y);
	// 			repels[1].x = Math.abs(vel[1].x);
	// 			repels[1].y = Math.abs(vel[1].y);
	// 			player[0].addVector(repels[0]);
	// 			player[1].subVector(repels[1]);
	// 		}
	// 		if(player[0].y <= player[1].y){
	// 			repels[0].x = Math.abs(vel[0].x);
	// 			repels[0].y = -1 * Math.abs(vel[0].y);
	// 			repels[1].x = Math.abs(vel[1].x);
	// 			repels[1].y = Math.abs(vel[1].y);
	// 			player[0].addVector(repels[0]);
	// 			player[1].subVector(repels[1]);
	// 		}
	// 	}else if(player[0].x <= player[1].x){
	// 		if(player[0].y >= player[1].y){
	// 			repels[0].x = Math.abs(vel[0].x);
	// 			repels[0].y = Math.abs(vel[0].y);
	// 			repels[1].x = Math.abs(vel[1].x);
	// 			repels[1].y = Math.abs(vel[1].y);
	// 			player[0].addVector(repels[0]);
	// 			player[1].subVector(repels[1]);
	// 		}
	// 		if(player[0].y <= player[1].y){
	// 			repels[0].x = Math.abs(vel[0].x);
	// 			repels[0].y = -1 * Math.abs(vel[0].y);
	// 			repels[1].x = Math.abs(vel[1].x);
	// 			repels[1].y = Math.abs(vel[1].y);
	// 			player[0].addVector(repels[0]);
	// 			player[1].subVector(repels[1]);
	// 		}
	// 	}





// function eat(index){
// 	let retNum;
// 	for (let i = 0; i<player.length; i++){
// 		if(player[i].dist(player[i].x, player[i].y, foods[index].x, foods[index].y) <= player[i].radius+foods[index].radius){
// 			retNum = i;
// 			break;
// 		} else {
// 			retNum = false;
// 		}
//
// 	}
// 	return retNum;
//
//
// }



function init() {
	vel = new Vector(0,0);
	mpos = new Vector(canvas.width/2, canvas.height/2);
	mP = new Vector(0,0);
	name = prompt("Enter Name:");
	for(let i = 0; i < 5; i++){
		powerFoods.push(new Food(Math.random()*trueSpace.x, Math.random()*trueSpace.y, 10, colorRandom()));
	}

	for (let i = 0; i<5; i++){
		magnetFoods.push(new Food(Math.random()*trueSpace.x, Math.random()*trueSpace.y, 10, colorRandom()));
	}

	// repels.push(new Vector(0,0));

	for (let i = 0; i < 10; i++){
		deathFoods.push(new Food(Math.random()*trueSpace.x, Math.random()*trueSpace.y, 20, colorRandom()));
	}

    for( let i = 0; i < foodNum; i ++){
        foods.push(new Food(Math.random()*trueSpace.x, Math.random()*trueSpace.y, 10, colorRandom()));
    }
    player = new Player(trueSpace.x/2, trueSpace.y/2, 25, colorRandom(), name, 4);
    update();

}

function update() {

	mP.x = (canvas.width/2) + (player.x-mpos.x);
	mP.y = (canvas.height/2) + (player.y-mpos.y);
    c.clearRect(0,0,canvas.width, canvas.height);

    for(let i = 0; i < foods.length; i++){

		foods[i].draw(c, player);
		if(player.dist(player.x, player.y,foods[i].x,foods[i].y) <= player.radius + foods[i].radius){
			player.radius++;
			foods.splice(i, 1);
			foods.push(new Food(Math.random()*trueSpace.x, Math.random()*trueSpace.y, 10, colorRandom()));
			i--;
		}


	}
	if(!magnet){
		deathFood();
	}


	boundary();
	minimap();
	if(!power && !magnet){
		superFood();
		magnetFood();
	}
	player.update(c, mP, power);
	if (!dead){
		requestAnimationFrame(update);
	}
	if(dead){
		c.clearRect(0,0,canvas.width,canvas.height);
		deathPanel();
	}


		// stopPlayer();
}


	// console.log(velVec);
    // for(i = 0; i< player.length; i++){
	// 	player[i].update(c);
	// }
	// if(player.length > 1){
	// 	setTimeout(function(){
	// 		player[0].radius += player[1].radius;
	// 		player.splice(1,1);
	// 		vel.splice(1,1);
	// 		repels.splice(1,1);
	// 		mP.splice(1,1);
	//
	// 	}, 10000);
	// }





window.addEventListener('load', function() {
    init();
    window.addEventListener('mousemove', function(event){
        mpos.x = event.clientX - canvas.offsetLeft;
        mpos.y = event.clientY - canvas.offsetTop;
		// velocity();


    });
	// window.addEventListener('keydown', function(event){
	// 	if(event.key == 'w'){
	// 		if(player.length == 1){
	// 			shoot(player[0].feed(mpos, FEEDDISTANCE));
	// 			player[0].radius /= 2;
	// 		}
	//
	// 	}
	// })
});
