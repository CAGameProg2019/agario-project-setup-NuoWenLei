class Player extends Food{


    constructor(x, y, radius, color, name) {
        super(x, y, radius, color);
        this.name = name;
    }

    draw(context){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.radius, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
        context.strokeStyle = 'black';
        context.lineWidth = this.radius/40;
        context.fillStyle = 'white';
        context.font = this.radius/2+"px Arial";
        context.fillText(this.name, this.x-(this.name.length*(this.radius/6.7)), this.y+this.radius/5);
        context.strokeText(this.name, this.x-(this.name.length*(this.radius/6.7)), this.y+this.radius/5);
    }

    update(context){
        this.addVector(velVec);
        this.draw(context);
    }



}
Object.assign(Player, Food);
