class Turn {
    #getTime
    constructor(agent, getTime, numOfTurn) {
        this.clicks = 0;
        this.numOfTurn = numOfTurn;
        this.#getTime = getTime;
        this.agent = agent;
        this.choosenCards = [];
        this.success = false;
        this.scoreReward = 0;
        this.usedHint = false;
        this.Hint = null;
    }
    PickCard(card) {
        /*if(this.clicks >= 2){
            alert("tow much cards to this player");
            return ;
        }
        */
        if(this.clicks === 0){
            this.firstCard = card;
            card.exposed = true;
        }
        if (this.clicks >= 1){
            card.exposed = true;
            if(this.firstCard.GetIndex()[0] === card.GetSecondHalf()[0] && this.firstCard.GetIndex()[1] === card.GetSecondHalf()[1]){
                this.success = true;
                card.found = true;
                this.firstCard.found = true;
                this.scoreReward = 10;
            }
        }

        this.clicks += 1;
        this.choosenCards.push({ "card": card, "time": new Date(this.#getTime.getFullYear(),this.#getTime.getMonth(),
                this.#getTime.getDay(),this.#getTime.getHours() ,this.#getTime.getMinutes(), this.#getTime.getSeconds(), 
                this.#getTime.getMilliseconds())});
        
    }
    GetFirstTurnTime() {
        if(this.choosenCards.length < 1) {
            return null
        }
        return new Date(this.choosenCards[0].getFullYear(),this.choosenCards[0].getMonth(),this.choosenCards[0].getDay(),
            this.choosenCards[0].getHours() ,this.choosenCards[0].getMinutes(), this.choosenCards[0].getSeconds(), 
            this.choosenCards[0].getMilliseconds());
    }

    GetSecondTurnTime() {
        if(this.choosenCards.length < 2) {
            return null
        }
        return new Date(this.choosenCards[1].getFullYear(),this.choosenCards[1].getMonth(),this.choosenCards[1].getDay(),
            this.choosenCards[1].getHours() ,this.choosenCards[1].getMinutes(), this.choosenCards[1].getSeconds(),
            this.choosenCards[1].getMilliseconds());
    }
    GetFirstCard(){
        if(this.choosenCards.length < 1){
            return null;
        }
        return [this.choosenCards[0]["card"].GetIndex()[0], this.choosenCards[0]["card"].GetIndex()[1]];
    }
    
    GetSecondCard(){
        if(this.choosenCards.length < 2){
            return null;
        }
        return [this.choosenCards[1]["card"].GetIndex()[0], this.choosenCards[1]["card"].GetIndex()[1]];
    }
}