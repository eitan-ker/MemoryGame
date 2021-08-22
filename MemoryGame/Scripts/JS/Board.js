

class Card{
    #secondHalf
    #index
    constructor(index, name) {
        this.#index = index;
        this.name = name;
        this.exposed = false;
        this.found = false;
        this.turns = [];
    }
    GetIndex() {
        return this.#index;
    }
    SetSecondHalf(secondHalf) {
        this.#secondHalf = secondHalf;
    }
    isFound() {
        return this.found;
    }
    isExposed() {
        return this.exposed;
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
        this.livedCards = [];
        for(let i = 0; i < size[0]; i++){
            this.boardArray.push([]);
            for (let j = 0; j < size[1]; j++) {
                this.boardArray[i].push(new Card([i, j], cards[i][j]));
                this.livedCards.push([i,j])
            } 
        }
        
       // this.livedCards = [];
        //for (let i = 0; i < this.boardArray.length; i++) {
        //    this.livedCards= this.livedCards.concat(this.boardArray[i])
        //}
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
    updateLivedCard(card1, card2) {
        console.log("before update")
        console.log(card1, card2)
        let index = [];
        for (let i = 0; i < this.livedCards.length; i++) {
            if (card1[0] == this.livedCards[i][0] && card1[1] == this.livedCards[i][1]) {
                index.push(i);
            } else if (card2[0] == this.livedCards[i][0] && card2[1] == this.livedCards[i][1]) {
                index.push(i);
            }
        }
        console.log("indexes is", index)
        for (let i = index.length - 1; i >= 0; i--) {
            this.livedCards.splice(index[i], 1)
        }
        console.log("after update")
        console.log(this.livedCards)

    }

    
    GetBoard(){
        return this;
    }
    
    GetCard(row, col) {
        return this.boardArray[row][col];
    }
    
}

