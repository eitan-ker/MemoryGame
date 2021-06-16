class Turn {
    constructor(agent, gameManager, numOfTurn) {
        this.clicks = 0;
        this.gameManager = gameManager;
        this.numOfTurn = numOfTurn;
        this.time = gameManager.GetTime();
        this.agent = agent;
        this.choosenCards = [];
        this.success = false;
        this.scoreReward = 0;
        this.usedHint = false;
        this.Hint = null;
        
    }
    PickCard(card) {
        if(this.choosenCards.length > 2){
            //alert("tow much cards to this player");
            return ;
        }
        if (this.clicks === 2){
            if(card === card.GetSecondHalf()){
                this.success = true;
            } 
        }
        
        this.choosenCards.push({"card":card, "time": new Date(this.time.getMinutes(), this.time.getSeconds(), this.time.getMilliseconds())});
        this.clicks++;
    }
}