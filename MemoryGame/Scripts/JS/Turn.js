class Turn {
    constructor(agent, gameManager) {
        this.clicks = 0;
        this.numOfTurn = gameManager.currentTurn;
        this.time = gameManager.GetTime();
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
        if (this.clicks === 1){
            card.exposed = true;
            if(this.firstCard === card.GetSecondHalf()){
                this.success = true;
                card.found = true;
                this.firstCard.found = true;
            }
        }

        this.clicks += 1;
        this.choosenCards.push({"card":card, "time": new Date(this.time.getMinutes(), this.time.getSeconds(), this.time.getMilliseconds())});
        
    }
}