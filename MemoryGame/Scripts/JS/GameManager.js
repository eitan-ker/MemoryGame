﻿var firstChoise = true;
var firstRound = true;
var lockClicks;
var hint_lock;
var currentPlayer = -1;
var img = [];
var remainingCards = 0;//////////
var card_num = 0;
var gm;
var totalScore = 0;
class GameManager{
    #scores;
    #choosen_card;
    #turnsArray;
    #firstChoise;
    #firstRound;
    #lockClicks;
    #img;
    #card_num;
    #agents;
    #currentTurn;
    // #choicesIndexes;
    #personalTime
    #cardNames;
    #board;
    #boardImages
    #gameOrReplay//for game 1 and for replay 0
    constructor(size, numOfAgent, personalTime,configuration, replayBoard) {
        if(replayBoard === null) {
            this.#gameOrReplay = true;
        } else {
            this.#gameOrReplay = false;            
        }
        this.#scores = {
            "agent0":0
        };
        //this.GetTime = this.GetTime.bind(this);
        this.size = size;
        remainingCards = size[0] * size[1];///////////
        this.startTime = Date.now();
        this.configuration = configuration
        this.hintArr = [];
        this.TurnTimeout = this.TurnTimeout.bind(this);
        this.pickCard = this.pickCard.bind(this);
        this.TimerForTurn = this.TimerForTurn.bind(this);
        this.#firstChoise = true;
        this.#firstRound = true;
        this.#lockClicks = true;
        this.#img = [];
        this.#card_num = 0;
        this.#turnsArray = [];
        this.#agents = [];
        this.#currentTurn = 0;
        this.#personalTime = personalTime;
        this.choicesIndexes = [];
        this.globalTime = new Date(0);
        this.globalTime.setHours(0);
        if(replayBoard === null){
            this.#cardNames = this.getCards(size[0] * size[1], size[1]);
        }        
        
        document.getElementById("board").innerHTML = this.CreateBoard(size[0], size[1]);
        if(replayBoard === null){
            this.#board = new Board([size[0], size[1]], this.#cardNames);
        } else {
            let cards ;
            for(let i = 0; i < replayBoard.length ; i++) {
                let row = [];
                for(let j = 0; j < replayBoard[0].length; j++) {
                    if(i === 0 && j === 0) {
                        row = [replayBoard[i][j].name];
                    } else {
                        row = row.concat(replayBoard[i][j].name);
                    }
                }
                if(i === 0){
                    cards = [row];
                } else {
                    cards = cards.concat([row]);
                }
            }
            this.#board = new Board([replayBoard.length ,replayBoard[0].length],cards);
        }
        
        this.MakePairs();
        this.turnTimeout = null;
        this.CreateAgents(numOfAgent);
        this.turn = new Turn(this.#agents[0].name, this.globalTime, this.#turnsArray.length + 1);
        if(replayBoard == null) {
            this.personalInterval = setInterval(this.TimerForTurn, 1000);
            this.globalInterval = null;
            
            gm = this;
            this.Intervals(numOfAgent, personalTime, this.globalTime, this.#agents,  this.#turnsArray, this.turn, this.#board);
            this.#boardImages = this.#board.boardArray;
        } 
        /*else {
            this.#board.boardArray = this.#boardImages;
        }*/
        
        /*setTimeout(function (){
            alert("time's over");
        }, totalTime);*/
    }
    
    
    MakePairs(){
        let board;
        if(this.#board.boardArray === undefined){
            for(let i = 0; i < this.#board.length; i++) {
                if( i === 0){
                    board = this.#board[i];
                } else {
                    board.concat(this.#board[i]);
                }
            }
        } else {
            board = this.#board.boardArray;
        }
        
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
                let potential = indexses[this.#board.boardArray[i][j].name]
                for(let index of potential){
                    if(index[0] !== i || index[1] !== j){
                        this.#board.boardArray[i][j].SetSecondHalf(index);
                    }
                }
            }
        } 
        
    }
    
    Intervals(numOfAgents, personalTime,globalTime, agents, turnsArray, turn, board){
        //sets the global time of the game.
        this.globalInterval= setInterval(function () {
            globalTime.setSeconds(globalTime.getSeconds() + 1);
            document.getElementById("total_time_text").innerHTML = globalTime.toLocaleTimeString();
        }, 1000);

        // set interval to change turns between players
        this.TurnTimeout()
        this.turnTimeout = setTimeout(this.TurnTimeout, this.#personalTime)
    }
    TimerForTurn() {

        let player = document.getElementById("agent" + currentPlayer);
        let text = $(player).find("#time_text").text();
        text = text.split(":")
        let hours = Number(text[0]);
        let minute = Number(text[1]);
        if (minute == 59) {
            minute = 0;
            hours = hours + 1;
        } else {
            minute = minute + 1;
        }
        if (minute <= 9) {
            minute = "0" + minute.toString();
        }
        else {
            minute = minute.toString();
        }
        if (hours <= 9) {
            hours = "0" + hours.toString();
        }
        else {
            hours = hours.toString();
        }
        $(player).find("#time_text").text(hours + ":" + minute);
    }
    UpdateScore() {
        let player = document.getElementById("agent" + currentPlayer);
        let text = $(player).find("#score_text").text();
        text = Number(text);
        text = text + 10
        $(player).find("#score_text").text(text.toString());
    }
    async TurnTimeout() {
        if(!this.#gameOrReplay) {
            if (img.length > 0) {
                for (let i = 0; i < img.length; i++) {
                    $(img[i]).fadeOut();
                }
                img = [];
            }
            return;
        }
        //console.log("we in TurnTimeout function")
        if (firstRound !== true) {
            this.#agents[currentPlayer].addTurn(this.turn)
        }
        this.choicesIndexes = [];
        // turn = new Turn(currentPlayer % numOfAgents, gameManager);
        if (img.length > 0) {
            for (let i = 0; i < img.length; i++) {
                $(img[i]).fadeOut();
            }
            img = [];
        }

        if (firstRound === true) {
            $($("#board_info").find("p")).fadeOut();
            $($("#agent_area").children()[0]).css("background-color", "red");
            lockClicks = false;
            hint_lock = false;
            firstRound = false;
            firstChoise = true;
            //this.#agents[0].choosePairTest();
            // turnsArray.push(turn);
            this.turn = new Turn(this.#agents[0].name, this.globalTime, this.#turnsArray.length + 1);
            this.AddTurn(this.turn);
            currentPlayer += 1;
            return;
        }
        if (currentPlayer === this.#agents.length - 1) {
            this.turn = new Turn(this.#agents[0].name, this.globalTime, this.#turnsArray.length + 1);
            currentPlayer = 0;
            lockClicks = false;
            hint_lock = false;
            firstChoise = true;
            card_num = 0;
            $($("#agent_area").children()[this.#agents.length - 1]).css("background-color", "darkgrey");
            $($("#agent_area").children()[currentPlayer % this.#agents.length]).css("background-color", "red");
        } else {
            currentPlayer += 1;
            lockClicks = true;
            hint_lock = true;
            this.turn = new Turn(this.#agents[currentPlayer % this.#agents.length].name, this.globalTime, this.#turnsArray.length + 1);
            firstChoise = true;
            this.choicesIndexes = [];
            $($("#agent_area").children()[currentPlayer % this.#agents.length - 1]).css("background-color", "darkgrey");
            $($("#agent_area").children()[currentPlayer % this.#agents.length]).css("background-color", "yellow");
        }
        this.choicesIndexes = [];
        this.AddTurn(this.turn);
        //this.turn = new Turn(this.#agents[currentPlayer].name,this)
        if (this.personalInterval != null) {
            clearInterval(this.personalInterval);
        }
        this.personalInterval = setInterval(this.TimerForTurn, 1000);
        if (this.turnTimeout != null) {
            clearTimeout(this.turnTimeout)
        }
        this.turnTimeout = setTimeout(this.TurnTimeout, this.#personalTime)
        this.#agents[currentPlayer].choosePair();
            }
    GetBoard(){
        return this.#board.boardArray;
    }
    
    AddTurn(turn) {
        this.#turnsArray = this.#turnsArray.concat(turn);
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
                if (j == this.#choosen_card[i]) {
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

    CreateAgents(numOfAgents) {
        this.#agents.push(new Player())
        for (let i = 1; i <= numOfAgents; i++){
            this.#agents.push(new Agent(new HandlerHistory(this), new HandlerStatus(this), "agent " + i));
        }
        //Initialize agents area with desired num of agents
        let player = document.getElementsByClassName("player")[0];
        player.setAttribute("id", "agent" + 0);
        for (let i = 1; i <= numOfAgents ; i++) {
            let player = document.getElementsByClassName("player")[0].cloneNode(true);
            player.setAttribute("id", "agent" + i);
            $(player).find( "h4" ).text("agent " + (i));
            document.getElementById("agent_area").appendChild(player);
            this.#scores["agent" + i] = 0;
        }
    }

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
    getAgents(){
        let answer = [];
        for (let i = 0; i < this.#agents.length; i++) {
            answer.push(this.#agents[i].name);
        }
        return answer;
    }
    AddAgent(agent) {
        this.#agents[this.#agents.length] = agent;
    }
    getAllTurns(){
        return this.#turnsArray;
    }
    addScorePerAgent(nameOfAgent){
        this.#scores[nameOfAgent] += 1;
    }
    getScorePerAgent(nameOfAgent) {
        for (let i = 0; i < this.#agents.length; i++) {
            if (this.#agents[i].name == nameOfAgent) {
                return this.#agents[i].getScore();
            }
        }
    }
    getAllTimeTurnsPerAgent(nameOfAgent) {
        for (let i = 0; i < this.#agents.length; i++) {
            if (this.#agents[i].name == nameOfAgent) {
                return this.#agents[i].getAllTimeTurnsPerAgent();
            }
        }
    }
    getBoardDimensins() {
        return this.#board.getBoardDimensins();
    }
    getLiveCards() {
        return this.#board.getLiveCards();
    }
    getNumOfCardOnBoard() {
        return this.#board.getNumOfCardOnBoard();
    }
    getAllPairExposed() {
        return this.#board.getAllPairExposed();
    }
    getSecondHalf(row, col) {
        this.#board.boardArray[row][col].GetSecondHalf();
    }
    async pickCard(row, col) {
        let current = currentPlayer
        //console.log(row, col)
        let cards = document.getElementsByClassName("cardFrame");
        //console.log(cards)
        let card = null;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].getAttribute("ws-row") == row && cards[i].getAttribute("ws-column") == col) {
                card = cards[i]
            }
        }
        if (card == null) {
            console.log("can't find the card on the html elements")
            return;
        }
        if (this.choicesIndexes.length > 2) {
            return;
        }
        /*if(!this.#gameOrReplay) {
            this.ShowCardfromTD(card)
            this.choicesIndexes[0]=[row, col];
            this.turn.PickCard(this.#board.boardArray[row][col]);
            return ;
        }*/
        else if (this.choicesIndexes.length == 1) {
            this.ShowCardfromTD(card)
            this.choicesIndexes[1]=[row, col];
            this.turn.PickCard(this.#board.boardArray[row][col]);
            //console.log(this.choicesIndexes)
            await this.IsPair(JSON.parse(JSON.stringify(this.choicesIndexes))).then(bool => {
                if (bool){
                    this.updateFindPair()
                }
            })
           /* if (await this.IsPair(JSON.parse(JSON.stringify(this.choicesIndexes)))) {
                this.updateFindPair()
            }*/
            if(this.#gameOrReplay){
                this.#agents[current].addTurn(this.turn);
            } 
            if (this.#board.getLiveCards().length == 0) {
                console.log("game is over")
                this.endOfGame()
                return;
            }
            //sleep(100)
            this.choicesIndexes = [];
            clearTimeout(this.turnTimeout)
            await sleep(1000)
            await this.TurnTimeout();
            //this.turnTimeout = setTimeout(this.TurnTimeout, this.#personalTime)

        }
        else if (this.choicesIndexes.length == 0) {
            this.ShowCardfromTD(card)
            this.choicesIndexes[0]=[row, col];
            this.turn.PickCard(this.#board.boardArray[row][col]);
        }
        //console.log("this is choices array", this.choicesIndexes)
        return this.#board.GetCard(row, col);
    }
    getCard(row, col) {
        return this.#board.GetCard(row,col)
    }
    getHint() {
        //let hint = new Hint
    }
    GetTime(){
        return new Date(this.globalTime.getMinutes(), this.globalTime.getSeconds(), this.globalTime.getMilliseconds());
    }
    async GetHint(){
        if(hint_lock){
            return ;
        }

        let cards = document.getElementsByClassName("cardFrame");
        //console.log(cards)
        var p_row = this.getLiveCards()[0][1];//card.getAttribute("ws-Row");
        var p_col = this.getLiveCards()[0][1];//card.getAttribute("ws-Column");
        let card = null;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].getAttribute("ws-row") == p_row && cards[i].getAttribute("ws-column") == p_col) {
                card = cards[i]
            }
        }
        if (card == null) {
            console.log("can't find the card on the html elements")
            return;
        }
        if (this.choicesIndexes.length >= 2) {
            return;
        }
        else  {
            let row = this.getLiveCards()[0][0];
            let col = this.getLiveCards()[0][1];
            //gameManager.pickCard(row, col);
            let img1 = document.createElement('img');
            img1.id = "hint_img";
            img1.src = "/MemoryGame/resources/Card_photos/" + this.#board.boardArray[parseInt(p_row)][parseInt(p_col)].name + ".jpeg";
            img1.alt = this.#board.boardArray[parseInt(p_row)][parseInt(p_col)].name;
            img1.width = 70;
            img1.height = 70;
            card = $(card).find("#card");
            card.append(img1);
            hint_lock = true;
            await sleep(1000);
            $(img1).fadeOut();
            //$(this).find('hint_img').fadeOut();
            
        }
    }
    async IsPair(choicesIndexes) {
        let board = this.#board;
        //console.log(this.choicesIndexes)
    //if (cardsNames[choicesIndexes[0][0]][choicesIndexes[0][1]] === cardsNames[choicesIndexes[1][0]][choicesIndexes[1][1]]) {
        if (board.boardArray[choicesIndexes[0][0]][choicesIndexes[0][1]].name === board.boardArray[choicesIndexes[1][0]][choicesIndexes[1][1]].name
            && board.boardArray[choicesIndexes[0][0]][choicesIndexes[0][1]].GetIndex() !== board.boardArray[choicesIndexes[1][0]][choicesIndexes[1][1]].GetIndex()) {
            //console.log([choicesIndexes[0][0], choicesIndexes[0][1]] + "," + [choicesIndexes[1][0], choicesIndexes[1][1]]);
            var table = $("#memoryTable")[0];
            var cell = table.rows[choicesIndexes[0][0]].cells[choicesIndexes[0][1]];
            await sleep(2000)
            $(cell).css({ 'visibility': 'hidden' });
            cell = table.rows[choicesIndexes[1][0]].cells[choicesIndexes[1][1]];
            $(cell).css({ 'visibility': 'hidden' });
            remainingCards -= 2;
            this.UpdateScore()
            totalScore += 10;
            $("#total_score_text").text(totalScore);
        /* if(currentPlayer == 0){
             scores["agent0"] +=1 ;
             $(".player").find( ".score_agent" ).text(scores["agent"+currentPlayer]);
         } else{
             scores["agent"+currentPlayer] +=1;
             $("#agent"+currentPlayer).find( ".score_agent" ).text(scores["agent"+(currentPlayer + 1)]);
         }*/
            this.#scores["agent" + currentPlayer] += 10;
            //$("#agent" + currentPlayer).find("#score_text").text(scores["agent" + (currentPlayer)]);
            //clearTimeout(this.turnTimeout)
            //setTimeout(this.TurnTimeout,1000)
            return true

    }
        return false;
}
    async ShowCard(jqueryEllement) {
        parent = jqueryEllement.parent();
        var p_row = parent.attr("ws-Row");
        var p_col = parent.attr("ws-Column");
        img[card_num] = document.createElement('img');
        img[card_num].id = "cardId";
        img[card_num].src = "/MemoryGame/resources/Card_photos/"+ gameManager.#board.boardArray[parseInt(p_row)][parseInt(p_col)].name+".jpeg";
        img[card_num].alt = gameManager.#board.boardArray[parseInt(p_row)][parseInt(p_col)].name;
        img[card_num].width = 70;
        jqueryEllement.append(img[card_num]);
        card_num = card_num + 1;
        if (firstChoise) {
            firstChoise = false;
            this.choicesIndexes[0] = [p_row, p_col];
            this.turn.PickCard(this.#board.boardArray[p_row][p_col]);

        } else {
            clearTimeout(this.turnTimeout)
            if(hint_lock == false){
                lockClicks = true; // lock the clicks after second card choise
            }
            
            this.turn.PickCard(this.#board.boardArray[p_row][p_col]);
            //firstChoise = true;
            this.choicesIndexes[1] = [p_row, p_col];
            await sleep(1000)
            await this.IsPair(JSON.parse(JSON.stringify(this.choicesIndexes))).then(async (bool) => {
                if (bool) {
                    this.updateFindPair()
                    if (this.#board.getLiveCards().length == 0) {
                        console.log("game is over")
                        this.endOfGame()
                        return;
                    }
                    //clearTimeout(this.turnTimeout)
                    //await sleep(1000)
                    //await this.TurnTimeout();
                }
                this.#agents[currentPlayer].addTurn(this.turn)
                this.choicesIndexes = [];
                await this.TurnTimeout();
            })
           /* if (this.IsPair(JSON.parse(JSON.stringify(this.choicesIndexes)))) {
                this.updateFindPair()

                if (this.#board.getLiveCards().length == 0) {
                    console.log("game is over")
                    this.endOfGame()
                    return;
                }
                clearTimeout(this.turnTimeout)
                await sleep(1000)
                this.TurnTimeout();
            }*/
            //save documentation of the turn with 
            //this.#agents[0].addTurn(this.turn)
            //alert(choicesIndexes[0].concat( choicesIndexes[1]));
           /* if (remainingCards === 0) {
                document.getElementById("board").innerHTML = "<h1>game over</h1>";
            }*/

            firstChoise = true;
            //this.choicesIndexes = []; // initilize the choices
            //sleep(1000);
            /*for(image of img){
                $(image).fadeOut();
            }*/
        }
    }
    
    GetTurnsInfo() {
        return this.#turnsArray;
    }
    async ShowCardfromTD(jqueryEllement) {
        
        //parent = jqueryEllement.parent();
        var p_row = jqueryEllement.getAttribute("ws-Row");
        var p_col = jqueryEllement.getAttribute("ws-Column");
        img[card_num] = document.createElement('img');
        img[card_num].id = "cardId";
        img[card_num].src = "/MemoryGame/resources/Card_photos/" + this.#board.boardArray[parseInt(p_row)][parseInt(p_col)].name + ".jpeg";
        img[card_num].alt = this.#board.boardArray[parseInt(p_row)][parseInt(p_col)].name;
        img[card_num].width = 70;
        img[card_num].height = 70;
       // console.log(img)
        jqueryEllement = $(jqueryEllement).find("#card");
        jqueryEllement.append(img[card_num]);
        card_num = card_num + 1;
        if (firstChoise) {
            firstChoise = false;

        } else {
            lockClicks = true; // lock the clicks after second card choise

            firstChoise = true;
           // choicesIndexes[1] = [p_row, p_col];
            //await IsPair(choicesIndexes);
            //save documentation of the turn with 

           // this.turn.PickCard(this.#board.boardArray[p_row][p_col]);
            //alert(choicesIndexes[0].concat( choicesIndexes[1]));
          /*  if (remainingCards === 0) {
                document.getElementById("board").innerHTML = "<h1>game over</h1>";
            }*/

            //firstChoise = true;
            //this.choicesIndexes = []; // initilize the choices
            await sleep(1000);
            /*for(image of img){
                $(image).fadeOut();
            }*/
        }
    }
    updateFindPair() {
        //console.log("this is the choices indexes", this.choicesIndexes)
        this.#board.updateLivedCard(this.choicesIndexes[0], this.choicesIndexes[1])
    }
    async endOfGame() {
        document.getElementById("board").innerHTML = "<h1>game over</h1>";
        this.#agents[0].choosePairTest()
        if (this.globalInterval != null) {
            clearInterval(this.globalInterval);
        }
        if (this.personalInterval != null) {
            clearInterval(this.personalInterval);
        }
        if (this.turnTimeout != null) {
            clearTimeout(this.turnTimeout)
        }
        let dataForServer = {}
        let board = this.#board.boardArray;
        var initBoard = [];
        for (let i = 0; i < board.length; i++) {
            initBoard.push([]);
            for (let j = 0; j < board[0].length; j++) {
                initBoard[i].push({
                    name: board[i][j].name,
                    indices: board[i][j].GetIndex()
                });
            }
        }
        dataForServer["initBoard"] = initBoard
        dataForServer["turnInfo"] = this.#turnsArray;

        let temp = [];
        for (let i = 0; i < this.#agents.length; i++) {
            let agent = {}
            agent["name"] = this.#agents[i].name
            agent["turnInfo"] = this.#agents[i].turnInfo
            agent["score"] = this.#agents[i].score
            agent["successNumber"] = this.#agents[i].successNumber
            temp.push(agent);
        }
        dataForServer["agents"] = temp;
        dataForServer["numberofTurns"] = this.#turnsArray.length;
        dataForServer["configuration"] = this.configuration;
        let scores = [];
        for (let i = 0; i < this.#agents.length; i++) {
            scores.push({ name: this.#agents[i].name, score: this.#agents[i].getScore() })
        }
        dataForServer["scores"] = scores;
        dataForServer["hintArr"] = this.hintArr
        dataForServer["startTime"] = this.startTime;
        dataForServer["endTime"] = Date.now()
        console.log(dataForServer);
        sessionStorage.setItem("scores", JSON.stringify(scores));
        sessionStorage.setItem("size", JSON.stringify(this.size));

        sessionStorage.setItem("config", JSON.stringify(this.configuration));
        
        sessionStorage.setItem("turnsArray", JSON.stringify(this.#turnsArray));
        sessionStorage.setItem("boardImages", JSON.stringify(this.#boardImages));
        
        //this.done = true;
        await this.Replay();
        //sleep(this.GetTime().getMinutes() * 60000, this.GetTime().getSeconds() * 1000);
        window.location.replace("/MemoryGame/Home/EndGame"); //to prevent page back
    }
    async Replay(){
        window.location.replace("/MemoryGame/Home/Replay");
        document.getElementById("board").innerHTML = this.CreateBoard(size[0], size[1]);
        let lastTurnTime = 0;
        for (let turn1 in this.#turnsArray) {
            if(turn1.GetFirstTurnTime() != null){
                let time = turn1.GetFirstTurnTime().getSeconds();
                sleep((time - lastTurnTime) % 60);
                let firstCard = turn1.GetFirstCard();
                this.pickCard(firstCard[0], firstCard[1]);
                lastTurnTime = time;
            }
            if(turn.GetSecondTurnTime() != null){
                let time = turn1.GetSecondTurnTime().getSeconds();
                sleep((time - lastTurnTime) % 60);
                let firstCard = turn1.GetFirstCard();
                this.pickCard(firstCard[0], firstCard[1]);
                lastTurnTime = time;
            }
        }
    }
}