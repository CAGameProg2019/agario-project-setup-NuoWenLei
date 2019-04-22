class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addVector(vec){
        this.x += vec.x;
        this.y += vec.y;
        // console.log(this.x, this.y);
        return this;
    }

//Functions to write for HW
    subVector(vec){
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    scale(s){
        this.x *= s;
        this.y *= s;
        return this;

    }

    dist(x1, y1, x2, y2){
    	return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
    }

    toString() {
        return '<' + this.x + ',' + this.y + '>';
    }

    magnitude() {
        return Math.sqrt(this.x*this.x +this.y *this.y);
    }

    toDirVec(){
        this.scale(1/this.magnitude());
    }

}
