
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

function choosePairTest() {
    let lived = this.handlerStatus.getLivedCards();
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
    this.handlerStatus.pickCard(lived[1][0], lived[1][1]);

}

class OptimalAgent {
    constructor(handlerHistory, handlerStatus, name) {
        this.handlerHistory = handlerHistory;
        this.handlerStatus = handlerStatus;
        this.name = name;
        this.turnInfo = [];
        this.successNumber = 0;
        this.score = 0;
    }
    async choosePair() {
        let pairs = this.handlerStatus.getAllPairExposed();
        // check if we have a pair that already exposed
        if (pairs.length!== 0){
            console.log("OptimalAgent: find pair exposed" + pairs[0])
            let pair = pairs[0];
            await sleep(3000)
            this.handlerStatus.pickCard(pair[0].index[0], pair[0].index[1]);
            await sleep(3000)
            this.handlerStatus.pickCard(pair[1].index[0], pair[1].index[1]);
            await sleep(1000)
            return
        }
        let lived = this.handlerStatus.getLiveCards();
        console.log("this is the lived card", lived)
        // choose a random card
        let firstCardIndex = Math.floor(Math.random() * lived.length)
        await sleep(3000)
        let firstCard = this.handlerStatus.pickCard(lived[firstCardIndex][0], lived[firstCardIndex][1]);
        await sleep(3000)
        let exposedCards = this.handlerStatus.getExposedCards()
        // try to find the pair of the first card
        for (let i =0; i<exposedCards.length; i++){
            // if the name is not the same continue to next card
            if (firstCard.name !== exposedCards[i].name){
                continue;
            }
            // if the indexes is not the same we find the card pair and we will choose him.
            if (firstCard.index[0] !== exposedCards[i].index[0] && firstCard.index[1] !== exposedCards[i].index[1] ){
                this.handlerStatus.pickCard(exposedCards[i].index[0], exposedCards[i].index[1]);
                await sleep(1000)
                return
            }
        }
        // if we don't find the pair of the first card, we will choose a random card
        let secondCardIndex;
        while (true){
            secondCardIndex = Math.floor(Math.random() * lived.length)
            if (secondCardIndex !== firstCardIndex){
                break;
            }
        }
        this.handlerStatus.pickCard(lived[secondCardIndex][0], lived[secondCardIndex][1]);
        await sleep(1000)
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

class Agent1 {
    constructor(handler, index, gameManager) {
        this.handler = handler;
        this.index = index;
        this.gameManager = gameManager;
    }
    PlayTurn() {
    }
    
    SetHandler(newHandler){
        this.handler = newHandler;
    }
    choose_random() {
        let board = this.handler.get_all_card();
        let i = Math.floor(Math.random() * board.length);
        let j = Math.floor(Math.random() * board.length);
        while (i == j) {
            j = Math.floor(Math.random() * board.length);
        }
        return [board[i].indexs, board[j].indexs];
    }
    // Method
    choosePair() {
        console.log("Agent" + this.index);
        let choose_array = [];
        cards = this.handler.get_last_cards_show(4);
        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if (cards[i].val == cards[j].val) {
                    choose_array.push(cards[i].indexs);
                    choose_array.push(cards[j].indexs);
                    break;
                }
            }
        }
        if (choose_array.length == 0) {
            choose_array = this.choose_random();
        }
        return { index: choose_array, time: 20 };
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

