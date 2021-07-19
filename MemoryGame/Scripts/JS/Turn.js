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
            if(this.firstCard.index[0] === card.GetSecondHalf()[0] && this.firstCard.index[1] === card.GetSecondHalf()[1]){
                this.success = true;
                card.found = true;
                this.firstCard.found = true;
                this.scoreReward = 10;
            }
        }

        this.clicks += 1;
        this.choosenCards.push({ "card": card, "time": new Date(this.#getTime().getMinutes(), this.#getTime().getSeconds(), this.#getTime().getMilliseconds())});
        
    }
}