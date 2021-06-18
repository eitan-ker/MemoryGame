
class Card{
    #secondHalf
    constructor(index, name) {
        this.index = index;
        this.name = name;
        this.exposed = false;
        this.found = false;
        this.turns = [];
    }
    SetSecondHalf(secondHalf) {
        this.#secondHalf = secondHalf;
    }
    isUp() {
        return this.found;
    }
    getExposedTurn() {
        return this.turns;
    }
    GetSecondHalf() {
        if(typeof this.#secondHalf === 'undefined'){
            // this statement will not execute
            throw "second half isn't defined";
        }
        return this.#secondHalf;
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
        for(let i = 0; i < size[0]; i++){
            this.boardArray.push([]);
            for (let j = 0; j < size[1]; j++) {
                this.boardArray[i].push(new Card([i,j],cards[i][j]));
            } 
        }
        
        this.livedCards = this.boardArray;
        this.exposedCards = [];
        this.turnsArray = [];

        
    }
    getBoardDimensins(){
        return this.size;
    }
    getLiveCards() {
        return this.livedCards;
    }
    getNumOfCardOnBoard(){
        return this.livedCards.length;
    }
    getAllPairExposed(){
        let answer = [];
        let indexArray = [];
        for (let i = 0; i < this.exposedCards.length; i++) {
            for (let j = i + 1; j < this.exposedCards.length; j++) {
                // check if the cards is a pair
                if (this.exposedCards[i].name == this.exposedCards[j].name) {
                    let flag = 1;
                    // check if we alrady insert those cards to the answer
                    for (let k = 0; k < indexArray.length; k++) {
                        if (indexArray[k] == i) {
                            flag = 0;
                            break;
                        }
                    }
                    // if we didn't insert already the cards to the answer so add it now
                    if (flag) {
                        indexArray.push(i);
                        indexArray.push(j);
                        answer.push([this.exposedCards[i], this.exposedCards[j]]);
                    }
                }
            }
        }
        return answer;
    }

    
    GetBoard(){
        return this;
    }
    
    GetCard(row, col) {
        return this.boardArray[row][col];
    }
    
}

