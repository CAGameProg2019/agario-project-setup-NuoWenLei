class Player extends Food{


    constructor(x, y, radius, color) {
        super(x, y, radius, color);
    }

    update(context){
        this.addVector(velVec);
        this.draw(context);
    }

}
Object.assign(Player, Food);
