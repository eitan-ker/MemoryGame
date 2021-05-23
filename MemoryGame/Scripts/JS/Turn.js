class Turn{
    constructor(agent, board) {
        this.clicks = 0;
        this.time = board.GetTime();
        this.agent = agent;
        this.choosenCards = [];
        this.success = false;
        this.usedHint = false;
        
    }
    PickCard(card) {
        if(this.choosenCards.length > 2){
            alert("tow much cards to this player");
            return ;
        }
        if (this.clicks === 2){
            if(card.name === card.secondHalf().name){
                this.success = true;
            } 
        }
        
        this.choosenCards.push({"card":card, "time": new Date(this.time.getMinutes(), this.time.getSeconds(), this.time.getMilliseconds())});
        this.clicks++;
    }
    
    }