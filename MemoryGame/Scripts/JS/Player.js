class Player {
    constructor(index, methodOfPlay) {
        this.index = index;
        this.methodOfPlay = methodOfPlay;
    }
}

class AmozonPlayer extends Player{
    constructor() {
        super(0, function () {
            
        });
    }
}