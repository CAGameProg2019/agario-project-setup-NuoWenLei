class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addVector(vec){
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

//Functions to write for HW
    subVector(vec){
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    scale(s){

    }

    toString() {
        return '<' + this.x + ',' + this.y + '>';
    }
}
