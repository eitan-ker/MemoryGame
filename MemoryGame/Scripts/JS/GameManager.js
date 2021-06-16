var firstChoise = true;
var firstRound = true;
var lockClicks;
var currentPlayer = -1;
var img = [];
var card_num = 0;

class GameManager{
    constructor(size, numOfAgent, personalTime) {
        this.scores = {
            "agent0":0
        };
        this.firstChoise = true;
        this.firstRound = true;
        this.lockClicks;
        this.currentPlayer = -1;
        this.img = [];
        this.card_num = 0;
        this.turnsArray = [];
        this.agents = []
        this.choicesIndexes = {};
        this.globalTime = new Date(0);
        
        this.cardNames = this.getCards(size[0] * size[1], size[1]);
        document.getElementById("board").innerHTML = this.CreateBoard(size[0], size[1]);
        
        this.board = new Board([size[0], size[1]], this.cardNames);
        this.MakePairs();
        this.turn = new Turn(this.agents[0], this);
        this.CreateAgents(numOfAgent);
        this.Intervals(numOfAgent, personalTime, this.globalTime, this.agents,  this.turnsArray, this.turn, this.board);
    }
    
    
    MakePairs(){
        let board = this.board.boardArray;
        var indexses = {};
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(indexses[board[i][j].name] && indexses[board[i][j].name].length > 0){
                    indexses[board[i][j].name].push([i,j])
                } else {
                    indexses[board[i][j].name] = [[i,j]]
                }
            }
        }
        console.log(indexses);
        for(let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let potential = indexses[this.board.boardArray[i][j].name]
                for(let index of potential){
                    if(index[0] !== i || index[1] !== j){
                        this.board.boardArray[i][j].SetSecondHalf(index);
                    }
                }
            }
        } 
    }
    
    
    Intervals(numOfAgents, personalTime,globalTime, agents, turnsArray, turn, board){
        //sets the global time of the game.
        setInterval(function () {
            globalTime.setSeconds(globalTime.getSeconds() + 1);
            document.getElementById("total_time_text").innerHTML = globalTime.toLocaleTimeString();
        }, 1000);

        // set interval to change turns between players

        setInterval(function () {
            if(firstRound === true) {
                $($( "#board_info" ).find( "p" )).fadeOut();
                $($("#agent_area").children()[0]).css("background-color", "red");
                lockClicks = false;
                firstRound = false;
                firstChoise = true;
                agents[0].PlayTurn();
                turnsArray.push(turn);
                turn = new Turn(agents[1], this.gameManager);
                currentPlayer += 1;
                return ;
            }
            if (currentPlayer === numOfAgents - 1) {
                currentPlayer = 0;
                lockClicks = false;
                firstChoise = true;
                card_num = 0;
                $($("#agent_area").children()[numOfAgents - 1]).css("background-color", "darkgrey");
                $($("#agent_area").children()[currentPlayer % numOfAgents]).css("background-color", "red");
            } else {
                currentPlayer += 1;
                lockClicks = true;
                //firstChoise = true;
                this.choicesIndexes = {};
                $($("#agent_area").children()[currentPlayer % numOfAgents - 1]).css("background-color", "darkgrey");
                $($("#agent_area").children()[currentPlayer % numOfAgents]).css("background-color", "yellow");
            }
            agents[currentPlayer].PlayTurn();
            turnsArray.push(turn);
            turn = new Turn(agents[currentPlayer % numOfAgents], this.gameManager);

        }, personalTime)
    }
    
    GetRandomCards(num, rowSize) {
        // array of all the cards that we have in resources/Card_photos
        var array = ['alligator', 'anteater', 'artic-fox', 'badger', 'bat', 'bear', 'beaver', 'bird', 'bison', 'boar', 'bugs', 'camel', 'cat', 'chicken', 'cow', 'coyote', 'crab', 'crocodile', 'deer', 'dog', 'dolphin', 'donkey', 'duck', 'eagle', 'eel', 'elephant', 'fish', 'flamingo', 'fox', 'frog', 'giraffe', 'goat', 'gorilla', 'guinea-pig', 'hawk', 'hedgehog', 'hen', 'hippo', 'horse', 'hyena', 'iguana', 'jellyfish', 'kangaroo', 'killer-whale', 'koala', 'Lemur', 'leopard', 'lion', 'Lizard', 'llama', 'Lobster', 'mole', 'monkey', 'moose', 'mouse', 'narwhal', 'newt', 'octopus', 'ostritch', 'otter', 'owl', 'panda', 'parrot', 'peacock', 'penguin', 'pig', 'pigeon', 'plankton', 'platypus', 'polar-bear', 'puffin', 'quail', 'queen-bee', 'rabbit', 'racoon', 'rat', 'rhino', 'rooster', 'scorpion', 'seagul', 'seahorse', 'seal', 'shark', 'sheep', 'shrimp', 'skunk', 'sloth', 'snake-2', 'snake-3', 'snake', 'squid', 'squirrel', 'starfish', 'stingray', 'swordfish', 'tarantula', 'tiger', 'toucan', 'turtle', 'urchin', 'vulture', 'walrus', 'whale', 'wolf', 'x-ray-fish', 'yak', 'zebra']
        var choosen_card = [];
        //choose indexs for the cards
        while (choosen_card.length != num / 2) {
            let flag = 0;
            let j = Math.floor(Math.random() * array.length);
            for (let i = 0; i < choosen_card.length; i++) {
                if (j == this.choosen_card[i]) {
                    flag = 1;
                    break;
                }
            }
            if (!flag) {
                choosen_card.push(j);
            }

        }
        // make all the indexs twice
        choosen_card= choosen_card.concat(choosen_card);
        // shaffle the card array
        for (let i = choosen_card.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            [choosen_card[i], choosen_card[rand]] = [choosen_card[rand], choosen_card[i]]
        }
        // convert the indexs to names
        var names_array = [];
        for (let i = 0; i < choosen_card.length; i++) {
            names_array.push([]);
            for (let j = 0; j < rowSize; j++) {
                names_array[i].push(array[choosen_card[i * rowSize + j]]);
            }
        }
        // return the array with names for the cards.
        return names_array;
    }

    CreateBoard(rows, columns) {
        let tableTag = '';
        tableTag += "<table id=\"memoryTable\">"
        for (let i = 0; i < rows; i++) {
            tableTag += "<tr id=\"row " + i + "\">"; // <tr id="row i">
            for (let j = 0; j < columns; j++) {
                tableTag += "<td class=\"cardFrame\" ws-column=\"" + j + "\" ws-row=\"" + i + "\">\n<button id=\"card\"/>\n</td>";
            }
            tableTag += "</tr>";
        }
        tableTag += "</table>";
        return tableTag;
    }

    CreateAgents(numOfAgents){
        for(let i = 0; i < numOfAgents; i++){
            this.agents.push(new Agent1(function (){}, i));
        }
        //Initialize agents area with desired num of agents
        let player = document.getElementsByClassName("player")[0];
        player.setAttribute("id", "agent" + 0);
        for (let i = 0; i < numOfAgents - 1; i++) {
            let player = document.getElementsByClassName("player")[0].cloneNode(true);
            player.setAttribute("id", "agent" + i);
            $(player).find( "h4" ).text("agent " + (i + 1));
            document.getElementById("agent_area").appendChild(player);
            this.scores["agent" + (i + 1)] = 0;
        }
    }

    /*getCards(num, rowsize) {
        // array of all the cards that we have in resources/Card_photos
        var array = ['alligator', 'anteater', 'artic-fox', 'badger', 'bat', 'bear', 'beaver', 'bird', 'bison', 'boar', 'bugs', 'camel', 'cat', 'chicken', 'cow', 'coyote', 'crab', 'crocodile', 'deer', 'dog', 'dolphin', 'donkey', 'duck', 'eagle', 'eel', 'elephant', 'fish', 'flamingo', 'fox', 'frog', 'giraffe', 'goat', 'gorilla', 'guinea-pig', 'hawk', 'hedgehog', 'hen', 'hippo', 'horse', 'hyena', 'iguana', 'jellyfish', 'kangaroo', 'killer-whale', 'koala', 'Lemur', 'leopard', 'lion', 'Lizard', 'llama', 'Lobster', 'mole', 'monkey', 'moose', 'mouse', 'narwhal', 'newt', 'octopus', 'ostritch', 'otter', 'owl', 'panda', 'parrot', 'peacock', 'penguin', 'pig', 'pigeon', 'plankton', 'platypus', 'polar-bear', 'puffin', 'quail', 'queen-bee', 'rabbit', 'racoon', 'rat', 'rhino', 'rooster', 'scorpion', 'seagul', 'seahorse', 'seal', 'shark', 'sheep', 'shrimp', 'skunk', 'sloth', 'snake-2', 'snake-3', 'snake', 'squid', 'squirrel', 'starfish', 'stingray', 'swordfish', 'tarantula', 'tiger', 'toucan', 'turtle', 'urchin', 'vulture', 'walrus', 'whale', 'wolf', 'x-ray-fish', 'yak', 'zebra']
        var choosen_card = [];
        //choose indexs for the cards
        while (choosen_card.length != num / 2) {
            let flag = 0;
            let j = Math.floor(Math.random() * array.length);
            for (let i = 0; i < choosen_card.length; i++) {
                if (j == choicesIndexes[i]) {
                    flag = 1;
                    break;
                }
            }
            if (!flag) {
                choosen_card.push(j);
            }
        }
    }
*/

    getCards(num, rowsize) {
        // array of all the cards that we have in resources/Card_photos
        var array = ['alligator', 'anteater', 'artic-fox', 'badger', 'bat', 'bear', 'beaver', 'bird', 'bison', 'boar', 'bugs', 'camel', 'cat', 'chicken', 'cow', 'coyote', 'crab', 'crocodile', 'deer', 'dog', 'dolphin', 'donkey', 'duck', 'eagle', 'eel', 'elephant', 'fish', 'flamingo', 'fox', 'frog', 'giraffe', 'goat', 'gorilla', 'guinea-pig', 'hawk', 'hedgehog', 'hen', 'hippo', 'horse', 'hyena', 'iguana', 'jellyfish', 'kangaroo', 'killer-whale', 'koala', 'Lemur', 'leopard', 'lion', 'Lizard', 'llama', 'Lobster', 'mole', 'monkey', 'moose', 'mouse', 'narwhal', 'newt', 'octopus', 'ostritch', 'otter', 'owl', 'panda', 'parrot', 'peacock', 'penguin', 'pig', 'pigeon', 'plankton', 'platypus', 'polar-bear', 'puffin', 'quail', 'queen-bee', 'rabbit', 'racoon', 'rat', 'rhino', 'rooster', 'scorpion', 'seagul', 'seahorse', 'seal', 'shark', 'sheep', 'shrimp', 'skunk', 'sloth', 'snake-2', 'snake-3', 'snake', 'squid', 'squirrel', 'starfish', 'stingray', 'swordfish', 'tarantula', 'tiger', 'toucan', 'turtle', 'urchin', 'vulture', 'walrus', 'whale', 'wolf', 'x-ray-fish', 'yak', 'zebra']
        var choosen_card = [];
        //choose indexs for the cards
        while (choosen_card.length != num / 2) {
            let flag = 0;
            let j = Math.floor(Math.random() * array.length);
            for (let i = 0; i < choosen_card.length; i++) {
                if (j == choosen_card[i]) {
                    flag = 1;
                    break;
                }
            }
            if (!flag) {
                choosen_card.push(j);
            }
        }
        // make all the indexs twice
        choosen_card= choosen_card.concat(choosen_card);
        // shaffle the card array
        for (let i = choosen_card.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            [choosen_card[i], choosen_card[rand]] = [choosen_card[rand], choosen_card[i]]
        }
        // convert the indexs to names
        var names_array = [];
        for (let i = 0; i < choosen_card.length; i++) {
            names_array.push([]);
            for (let j = 0; j < rowsize; j++) {
                names_array[i].push(array[choosen_card[i * rowsize + j]]);
            }
        }
        // return the array with names for the cards.
        return names_array;
    }
    GetTime(){
        return new Date(this.globalTime.getMinutes(), this.globalTime.getMinutes(), this.globalTime.getMilliseconds());
    }
}