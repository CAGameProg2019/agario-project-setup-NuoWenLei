class Food extends Vector{

    constructor(x, y, radius, color) {
        super(x,y);
        this.radius = radius;
        this.color = color;
    }


    draw(context){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.radius, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
    }

    update(context){
        
        this.draw(context);
    }


}
Object.assign(Food, Vector);
