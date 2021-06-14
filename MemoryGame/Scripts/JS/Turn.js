class Turn {
    constructor(agent, board,numOfTurn) {
        this.clicks = 0;
        this.numOfTurn = numOfTurn;
        this.time = board.GetTime();
        this.agent = agent;
        this.choosenCards = [];
        this.success = false;
        this.scoreReward = 0;
        this.usedHint = false;
        this.Hint = null;
        
    }
    PickCard(card) {
        if(this.choosenCards.length > 2){
            alert("tow much cards to this player");
            return ;
        }
        if (this.clicks === 2) {
            if (card.name === this.choosenCards[0].name) {
                this.success = true;
            } 
        }

        this.choosenCards.push({ "card": card.index, "name": card.name, "time": new Date(this.time.getMinutes(), this.time.getSeconds(), this.time.getMilliseconds()) });
        this.clicks++;
    }
}