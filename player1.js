class Player extends Food{


    constructor(x, y, radius, color, name, maxSpeed) {
        super(x, y, radius, color);
        this.name = name;
        this.maxSpeed = maxSpeed;
    }

    draw(context){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(canvas.width/2,canvas.height/2,this.radius, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
        context.strokeStyle = 'black';
        context.lineWidth = this.radius/40;
        context.stroke();
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = this.radius/2+"px Arial";
        context.fillText(this.name, canvas.width/2, canvas.height/2);
        context.strokeText(this.name, canvas.width/2, canvas.height/2);
    }

    // feed(mouse, dist){
    //     let dir = new Vector(mouse.x-this.x, mouse.y-this.y);
    //     let num = dist/(Math.abs(dir.x)+Math.abs(dir.y));
    //     dir.x *= num;
    //     dir.y *= num;
    //     return dir;
    // }

    update(context, mP, superVal){
        let vel = new Vector(mP.x, mP.y);
        vel.subVector(this);
        let dist = vel.magnitude();
        if(dist > 0){
            vel.toDirVec();
            vel.scale(this.maxSpeed);
            if(superVal === true){
                vel.scale(2);
            }
            if(dist < this.radius) {
                vel.scale(dist/this.radius);
            }

        }

        this.subVector(vel);

        // console.log(this.x, this.y);
        this.draw(context);
    }



}
Object.assign(Player, Food);
