class Turn {
    constructor(agent, gameManager) {
        this.clicks = 0;
        this.gameManager = gameManager;
        this.time = gameManager.GetTime();
        this.agent = agent;
        this.choosenCards = [];
        this.success = false;
        this.usedHint = false;
        
    }
    PickCard(card) {
        if(this.choosenCards.length > 2){
            //alert("tow much cards to this player");
            return ;
        }
        if (this.clicks === 2){
            if(card.name === card.GetSecondHalf().name){
                this.success = true;
            } 
        }
        
        this.choosenCards.push({"card":card, "time": new Date(this.time.getMinutes(), this.time.getSeconds(), this.time.getMilliseconds())});
        this.clicks++;
    }
}