class Player extends Food{


    constructor(x, y, radius, color, name, maxSpeed) {
        super(x, y, radius, color);
        this.name = name;
        this.maxSpeed = maxSpeed;
    }

    draw(context){
        super.draw(c);
        context.strokeStyle = 'black';
        context.lineWidth = this.radius/40;
        context.stroke();
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = this.radius/2+"px Arial";
        context.fillText(this.name, this.x, this.y);
        context.strokeText(this.name, this.x, this.y);
    }

    // feed(mouse, dist){
    //     let dir = new Vector(mouse.x-this.x, mouse.y-this.y);
    //     let num = dist/(Math.abs(dir.x)+Math.abs(dir.y));
    //     dir.x *= num;
    //     dir.y *= num;
    //     return dir;
    // }

    update(context, mP){
        let vel = new Vector(mP.x, mP.y);
        vel.subVector(this);
        let dist = vel.magnitude();
        if(dist > 0){
            vel.toDirVec();
            vel.scale(this.maxSpeed);
            if(dist < this.radius) {
                vel.scale(dist/this.radius);
            }

        }
        this.addVector(vel);
        // console.log(this.x, this.y);
        this.draw(context);
    }



}
Object.assign(Player, Food);
