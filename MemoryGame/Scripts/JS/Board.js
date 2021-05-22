class CardsDict{
    constructor() {
        this.dict = {};
    }
    getDict(){
        return this;
    }
}

class Card{
    constructor(index, name, cardsDict) {
        this.index = index;
        this.name = name;
        /*
        object which holds information on the board
        the idea is to make the card aware to the board current state..        
        * */ 
        this.cardsDict = cardsDict;
    }
    
    getSecondHalf(){
        if(this.cardsDict.getDict()[this.name][0] === this.index){
            return this.cardsDict.getDict()[this.name][0];
        }
        return this.cardsDict.getDict()[this.name][1];
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
        this.boardArray = [[] * size];
        for(let i = 0; i < size[0]; i++){
            for (let j = 1; j < size[1]; j++)
            this.boardArray[i][j] = cards[i * size[1] + j]
        }
    }
    
    getBoard(){
        return this;
    }
    
    getCard(row, col) {
        return this.boardArray[row][col];
    }
}
