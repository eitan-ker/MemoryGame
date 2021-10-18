
// function that create the agents and the player and return an array of all the agents.
/*function get_agents(num, handler) {
    var array_of_agent = [new Player()];
    for (let i = 1; i < num; i++) {
        array_of_agent.push(new Agent1(handler,i));
    }
    return array_of_agent;
}*/

class Agent {
    constructor(handlerHistory, handlerStatus, name) {
        this.handlerHistory = handlerHistory;
        this.handlerStatus = handlerStatus;
        this.name = name;
        this.turnInfo = [];
        this.successNumber = 0;
        this.score = 0;
    }
    async choosePair() {
        let lived = this.handlerStatus.getLiveCards();
        console.log("this is the lived card", lived)
        await sleep(3000)
        this.handlerStatus.pickCard(lived[0][0], lived[0][1]);
        await sleep(3000)
        this.handlerStatus.pickCard(lived[1][0], lived[1][1]);
    }
    async choosePairTest() {
        let lived = this.handlerStatus.getLiveCards();
        console.log("test for handler status:")
        console.log("the live card are: ");
        console.log(lived);
        console.log("get board dimensins")
        console.log(this.handlerStatus.getBoardDimensins())
        console.log("get Num Of Card On Board")
        console.log(this.handlerStatus.getNumOfCardOnBoard())
        console.log("get All Pair Exposed")
        console.log(this.handlerStatus.getAllPairExposed())
        console.log("get card")
        console.log(this.handlerStatus.getCard(lived[0][0], lived[0][1]))
        console.log("getHint")
        console.log(this.handlerStatus.getHint())
        console.log("test for handler history:")
        console.log("getAgents")
        let agents = this.handlerHistory.getAgents()
        console.log(agents)
        console.log("getAllTurns")
        console.log(this.handlerHistory.getAllTurns())
        console.log("getLastTurn")
        console.log(this.handlerHistory.getLastTurn())
        console.log("getLastPlayer")
        console.log(this.handlerHistory.getLastPlayer())
        console.log("getNumOfTurn")
        console.log(this.handlerHistory.getNumOfTurn())
        console.log("getAllTurnPerAgent")
        console.log(this.handlerHistory.getAllTurnPerAgent(agents[0]))
        console.log("getAllTimeTurnsPerAgent")
        console.log(this.handlerHistory.getAllTimeTurnsPerAgent(agents[0]))
        console.log("getScorePerAgent")
        console.log(this.handlerHistory.getScorePerAgent(agents[0]))
        this.handlerStatus.pickCard(lived[0][0], lived[0][1]);
        await sleep(1000)
        this.handlerStatus.pickCard(lived[1][0], lived[1][1]);

    }
    getType(){
        return "OptimalAgent";
    }
    getName(){
        return this.name
    }
    getSuccessNumber(){
        return this.successNumber
    }
    getTurnInfo(){
        return this.turnInfo
    }
    getAllTurnPerAgent(){
        return this.turnInfo;
    }
    getAllTimeTurnsPerAgent(){
        let answer = [];
        for (let i; i = 0; i < this.turnInfo.length) {
            answer.push(this.turnInfo[i].time);
        }
        return answer;
    }
    getScore(){
        return this.score;
    }
    addTurn(turn) {
        if (this.turnInfo.length != 0) {
            if (this.turnInfo[this.turnInfo.length - 1].numOfTurn === turn.numOfTurn) {
                return;
            }
        }
        this.turnInfo.push(turn);
        if (turn.success) {
            this.score += turn.scoreReward;
            this.successNumber += 1;
        }
    }
}


class OptimalAgent {
    constructor(baseAgent, name) {
        this.name = name;
        this.baseAgent = baseAgent
    }
    async choosePair() {
        let pairs = this.baseAgent.handlerStatus.getAllPairExposed();
        // check if we have a pair that already exposed
        if (pairs.length!== 0){
            console.log("OptimalAgent: find pair exposed" + pairs[0])
            let pair = pairs[0];
            await sleep(3000)
            this.baseAgent.handlerStatus.pickCard(pair[0].index[0], pair[0].index[1]);
            await sleep(3000)
            this.baseAgent.handlerStatus.pickCard(pair[1].index[0], pair[1].index[1]);
            await sleep(1000)
            return
        }
        let lived = this.baseAgent.handlerStatus.getLiveCards();
        console.log("this is the lived card", lived)
        // choose a random card
        let firstCardIndex = Math.floor(Math.random() * lived.length);
        await sleep(3000);
        let firstCard = this.baseAgent.handlerStatus.pickCard(lived[firstCardIndex][0], lived[firstCardIndex][1]);
        await sleep(3000);
        let exposedCards = this.baseAgent.handlerStatus.getExposedCards();
        // try to find the pair of the first card
        for (let i =0; i<exposedCards.length; i++){
            // if the name is not the same continue to next card
            if (firstCard.name !== exposedCards[i].name){
                continue;
            }
            // if the indexes is not the same we find the card pair and we will choose him.
            if (firstCard.index[0] !== exposedCards[i].index[0] && firstCard.index[1] !== exposedCards[i].index[1] ){
                this.baseAgent.handlerStatus.pickCard(exposedCards[i].index[0], exposedCards[i].index[1]);
                await sleep(1000);
                return
            }
        }
        // if we don't find the pair of the first card, we will choose a random card
        let secondCardIndex;
        while (true){
            secondCardIndex = Math.floor(Math.random() * lived.length);
            if (secondCardIndex !== firstCardIndex){
                break;
            }
        }
        this.baseAgent.handlerStatus.pickCard(lived[secondCardIndex][0], lived[secondCardIndex][1]);
        await sleep(1000)
    }
    getType(){
        return "OptimalAgent";
    }
    getName(){
        return this.name;
    }
    getSuccessNumber(){
        return this.baseAgent.successNumber;
    }
    getTurnInfo(){
        return this.baseAgent.turnInfo;
    }
    getAllTurnPerAgent(){
        return this.baseAgent.getAllTurnPerAgent();
    }
    getAllTimeTurnsPerAgent(){
        return this.baseAgent.getAllTimeTurnsPerAgent();
    }
    getScore(){
        return this.baseAgent.getScore();
    }
    addTurn(turn) {
        return this.baseAgent.addTurn(turn);
    }
}

class BadAgent {
    constructor(baseAgent, name) {
        this.name = name;
        this.baseAgent = baseAgent
    }
    async choosePair() {
        let exposedCards = this.baseAgent.handlerStatus.getExposedCards()
        let lived = this.baseAgent.handlerStatus.getLiveCards();
        if (exposedCards.length !== 0){
            let firstCardIndex = Math.floor(Math.random() * exposedCards.length)
            await sleep(3000)
            let card =this.baseAgent.handlerStatus.pickCard(exposedCards[firstCardIndex].index[0], exposedCards[firstCardIndex].index[1]);
            await sleep(3000)
            let secondCardIndex;
            while (true){
                secondCardIndex = Math.floor(Math.random() * lived.length)
                if (secondCardIndex !== firstCardIndex){
                    break;
                }
            }
            this.baseAgent.handlerStatus.pickCard(lived[secondCardIndex][0], lived[secondCardIndex][1]);
            await sleep(1000)
        }else{
            let firstCardIndex = Math.floor(Math.random() * lived.length)
            await sleep(3000)
            this.baseAgent.handlerStatus.pickCard(lived[firstCardIndex][0], lived[firstCardIndex][1]);
            await sleep(3000)
            let secondCardIndex;
            while (true){
                secondCardIndex = Math.floor(Math.random() * lived.length)
                if (secondCardIndex !== firstCardIndex){
                    break;
                }
            }
            this.baseAgent.handlerStatus.pickCard(lived[secondCardIndex][0], lived[secondCardIndex][1]);
            await sleep(1000)
        }
        
      
      
    }
    getType(){
        return "BadAgent";
    }
    getName(){
        return this.name
    }
    getSuccessNumber(){
        return this.baseAgent.successNumber
    }
    getTurnInfo(){
        return this.baseAgent.turnInfo
    }
    getAllTurnPerAgent(){
        return this.baseAgent.getAllTurnPerAgent();
    }
    getAllTimeTurnsPerAgent(){
        return this.baseAgent.getAllTimeTurnsPerAgent();
    }
    getScore(){
        return this.baseAgent.getScore();
    }
    addTurn(turn) {
        return this.baseAgent.addTurn(turn);
    }
}

class Player {
    constructor() {
        this.name = "Player";
        this.turnInfo = [];
        this.successNumber = 0;
        this.score = 0;
    }
    choosePair() {
        console.log("Player");
    }
    async choosePairTest() {
        console.log("Player");
    }
    getType(){
        return "Player";
    }
    getName(){
        return this.name
    }
    getSuccessNumber(){
        return this.successNumber
    }
    getTurnInfo(){
        return this.turnInfo
    }
    getAllTurnPerAgent() {
        return this.turnInfo;
    }
    getAllTimeTurnsPerAgent() {
        let answer = [];
        for (let i = 0; i < this.turnInfo.length; i++) {
            answer.push(this.turnInfo[i].time);
        }
        return answer;
    }
    getScore() {
        return this.score;
    }
    addTurn(turn) {
        if (this.turnInfo.length != 0) {
            if (this.turnInfo[this.turnInfo.length - 1].numOfTurn === turn.numOfTurn) {
                return;
            }
        }
        this.turnInfo.push(turn);
        if (turn.success) {
            this.score += turn.scoreReward;
            this.successNumber += 1;
        }
    }
}

