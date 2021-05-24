
// function that create the agents and the player and return an array of all the agents.
function get_agents(num, handler) {
    var array_of_agent = [new Player()];
    for (let i = 1; i < num; i++) {
        array_of_agent.push(new Agent1(handler,i));
    }
    return array_of_agent;
}

// function that the agent have access for them
// agent1.choose_pair() /// state of the board, x last cards that wee see, history of success(according to agent), x last turn, get score(for all the agents)
// get time(for each agent)

// output = {indexs:[i,j], time: 10}//

class Agent1 {
    constructor(handler, index) {
        this.handler = handler;
        this.index = index;
    }
    PlayTurn(){
        this.handler();
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
    choose_pair() {
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
    choose_pair() {
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