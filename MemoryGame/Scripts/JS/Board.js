class CardsDict{
    constructor() {
        this.dict = {};
    }
    getDict(){
        return this;
    }
}

class Card{
   /* constructor(index, name) {
        this.index = index;
        this.name = name;
    }*/
    constructor(index, name) {
        this.index = index;
        this.name = name;
        /*
        object which holds information on the board
        the idea is to make the card aware to the board current state..        
        * */ 
        //this.cardsDict = cardsDict;
    }
    
    SetDict(cardsDict) {
        this.cardsDict = cardsDict;
    }
    
   /* getSecondHalf(){
        if(this.cardsDict.getDict()[this.name][0] === this.index){
            return this.cardsDict.getDict()[this.name][0];
        }
        return this.cardsDict.getDict()[this.name][1];
    }*/
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
                /*if(j === 0) {
                    this.boardArray[i] = cards[i * (size[1] - 1) + j];
                }else {*/
                this.boardArray[i].push(cards[i * (size[1] - 1) + j]);
                //}
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

//module.exports = { Board, Card, CardsDict }
