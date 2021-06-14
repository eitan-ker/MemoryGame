
class Card{
    constructor(index, name) {
        this.index = index;
        this.name = name;
    }
    SetSecondHalf(secondHalf) {
        this.secondHalf = secondHalf;
    }
    GetSecondHalf() {
        if(typeof this.secondHalf === 'undefined'){
            // this statement will not execute
            throw "second half isn't defined";
        }
        return this.secondHalf;
    }
}

/*
* object for board, the constructor gets the dimentions of the board (2D array),
* and the cards (array of objects cards)
* */
class Board{
    constructor(size, cards) {
        if (cards.length !== size[0] * size[1]){
            throw "assigment is illegal, the size is wrong!";
        }
        this.size = size;
        this.boardArray = [];
        this.boardDict = {};
        for(let i = 0; i < size[0]; i++){
            this.boardArray.push([]);
            for (let j = 0; j < size[1]; j++) {
                this.boardArray[i].push(new Card([i,j],cards[i][j]));
            } 
        }
        this.globalTime = new Date(0);
        this.turnsArray = [];

        
    }
    
    GetBoard(){
        return this;
    }
    
    GetCard(row, col) {
        return this.boardArray[row][col];
    }
    GetTime(){
        return new Date(this.globalTime.getMinutes(), this.globalTime.getMinutes(), this.globalTime.getMilliseconds());
    }

}

