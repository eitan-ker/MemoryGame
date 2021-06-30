
// function that create the agents and the player and return an array of all the agents.
function get_agents(num, handler) {
    var array_of_agent = [new Player()];
    for (let i = 1; i < num; i++) {
        array_of_agent.push(new Agent1(handler,i));
    }
    return array_of_agent;
}

class Agent {
    constructor(handlerHistory, handlerStatus, name) {
        this.handlerHistory = handlerHistory;
        this.handlerStatus = handlerStatus;
        this.name = name;
        this.turnInfo = [];
        this.successNumber = 0;
        this.score = 0;
    }
    choosePair() {
        let lived = this.handlerStatus.getLiveCards();
        console.log("this is the lived card", lived)
        this.handlerStatus.pickCard(lived[0][0], lived[0][1]);
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
    addTurn(turn){
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
    choosePair() {
        console.log("Player");
    }
}

/*
handler={
    get_all_card // return all the card that in the board now - only the indexs of the card
    get_exposed_cards(number_of_card) // return the indexs and the value of the open cards, and it will be sorted by the time that the card was opened
    get_all_score // get all the score of the players until now
    get_score(agent_index) // get score for specific player until now
    get_all_history // return all the turns that have been played - the indexs that was choose, success or fail, the time that take to the player to make the turn
    get_history(number_of_turn_to_show) // return the last x turn that  have been played - the indexs that was choose, success or fail, the time that take to the player to make the turn
    get_time_for_turn // return the time for each turn
    get_all_time_for_players // return the time that each agent play until now
}*/