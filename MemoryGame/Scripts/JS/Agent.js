
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
    constructor(handler,index) {
        this.handler = handler;
        this.index = index;
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
