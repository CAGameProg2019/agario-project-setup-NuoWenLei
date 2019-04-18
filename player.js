class Player extends Food{


    constructor(x, y, radius, color, name, num) {
        super(x, y, radius, color);
        this.name = name;
        this.num = num;
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

    feed(mouse, dist){
        let dir = new Vector(mouse.x-this.x, mouse.y-this.y);
        let num = dist/(Math.abs(dir.x)+Math.abs(dir.y));
        dir.x *= num;
        dir.y *= num;
        return dir;
    }

    update(context){
        this.addVector(vel[this.num]);
        this.draw(context);
    }



}
Object.assign(Player, Food);
