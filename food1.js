class Food extends Vector{

    constructor(x, y, radius, color,) {
        super(x,y);
        this.radius = radius;
        this.color = color;
    }


    draw(context, playerVec){
        let vel = new Vector(0,0);

        if(magnet && this.dist(this.x, this.y, playerVec.x, playerVec.y) <= 500){
            vel.x = playerVec.x;
            vel.y = playerVec.y;
            vel.subVector(this);
            vel.toDirVec();
            vel.scale(playerVec.maxSpeed/1.5);
            this.addVector(vel);
        }
        context.fillStyle = this.color;
        context.beginPath();
        context.arc((canvas.width/2) +(this.x-playerVec.x),(canvas.height/2) +(this.y-playerVec.y),this.radius, 0, Math.PI*2, false);
        context.closePath();
        context.fill();

    }

    get mass(){
        return Math.PI * this.radius * this.radius;
    }
    set mass(newmass){
        this.radius = Math.sqrt(newmass/Math.PI);
    }

    addMass(m){
        this.mass += m;
    }



}
Object.assign(Food, Vector);
