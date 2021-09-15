var query;
var cow = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
var dog = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
var cards; //= [[cow, dog], [cow, dog]];
var cardsNames;// = [["cow", "dog"], ["cow", "dog"]];
var firstChoise = true;
var choicesIndexes = {};
var turnsDocumentation = [];

var agents = [];
var remainingCards;
var size;
var currentPlayer = -1;
var agentsAmount;
var totalScore = 0;
var scores = {
    "agent0":0
};
var globalTime = new Date(0);
var firstRound = true;
var lockClicks;
var works;
var crads_dict = {};
var data = {};
var board = new Board([2,2], [new Card([0,0], "cow"),new Card([0,1], "dog"),new Card([1,0], "cow"),new Card([1,1], "dog")]);
var turn = new Turn(agents[0], board);
var img = [];
var card_num = 0;
crads_dict["cow"] = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
crads_dict["dog"] = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
$(function () {
    $("#board_info").append( "<p>Loading</p>" );
    $("#board_info").find("p").css({fontSize:40, 'margin-top': ($("#board_info").height() - $("#board_info").find("p").height()) / 2});
    //assume we've got data object from GET
    data = {
        overallTime: "",// times in milliseconds
        personalTime: 8000,
        numOfCards: [5,2],
        numOfAgents: 2
    };
    /*function GetData(){
        return $.get("/MemoryGame/Data/GetInitData", function(initData, status){
            console.log(initData);
            var json = JSON.parse(initData);
            let data1 =  {
                overallTime: parseInt(json.overall_time),// times in milliseconds
                personalTime: parseInt(json.personal_time),
                numOfCards: parseInt(json.num_of_cards),
                numOfAgents: parseInt(json.num_of_agents)
            };
            alert("agents: " + data+ "\nStatus: " + status);
            works = true;
            return data1;
            
        });
    }
    data = GetData();
    
    alert(data.numOfAgents);*/
    
    /*for(let i = 0; i < data.numOfAgents; i++){
        agents.push(new Agent1(function (){}, i));
    }*/
    /*agents[0].SetHandler(
        function (){
        data.personalTime = 10000;
        console.log("new time is 10000");
    })
    agents[1].SetHandler(
        function (){
            data.personalTime = 30;
            console.log("new time is 300");
        })*/
    
      
    
    cardNames = getCards(data.numOfCards[0] * data.numOfCards[1], 4);
    
    board = new Board([data.numOfCards[0], data.numOfCards[1]], cardNames)
    
    agentsAmount = data.numOfAgents;
    
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
            board.turnsArray.push(turn);
            turn = new Turn(agents[1], board);
            currentPlayer += 1;
            return ;
        }
        if (currentPlayer === agentsAmount - 1) {
            currentPlayer = 0;
            lockClicks = false;
            firstChoise = true;
            card_num = 0;
            $($("#agent_area").children()[agentsAmount - 1]).css("background-color", "darkgrey");
            $($("#agent_area").children()[currentPlayer % data.numOfAgents]).css("background-color", "red");
        } else {
            currentPlayer += 1;
            lockClicks = true;
            //firstChoise = true;
            choicesIndexes = {};
            $($("#agent_area").children()[currentPlayer % data.numOfAgents - 1]).css("background-color", "darkgrey");
            $($("#agent_area").children()[currentPlayer % data.numOfAgents]).css("background-color", "yellow");
        }
        agents[currentPlayer].PlayTurn();
        board.turnsArray.push(turn);
        turn = new Turn(agents[currentPlayer % data.numOfAgents], board);
        
    }, data.personalTime)

    //Initialize board
    document.getElementById("board").innerHTML = CreateBoard(data.numOfCards[0], data.numOfCards[1]);
    remainingCards = data.numOfCards[0][1];
    
    //Initialize agents area with desired num of agents
    let player = document.getElementsByClassName("player")[0];
    player.setAttribute("id", "agent" + 0);
    for (let i = 0; i < data.numOfAgents - 1; i++) {
        let player = document.getElementsByClassName("player")[0].cloneNode(true);
        player.setAttribute("id", "agent" + i);
        $(player).find( "h4" ).text("agent " + (i + 1));
        document.getElementById("agent_area").appendChild(player);
        scores["agent" + (i + 1)] = 0;
    }
    
    /*function IsPair(choicesIndexes) {
        if (cardsNames[choicesIndexes[0][0]][choicesIndexes[0][1]] == cardsNames[choicesIndexes[1][0]][choicesIndexes[1][1]]) {
            var table = $("#memoryTable")[0];
            var cell = table.rows[choicesIndexes[0][0]].cells[choicesIndexes[0][1]];
            $(cell).hide();
            cell = table.rows[choicesIndexes[1][0]].cells[choicesIndexes[1][1]];
            $(cell).hide();
            remainingCards -= 2;
            score += 1;
            $("#total_score").text(score);
        }
    }*/
    
  
    $("button").click(async function () {
        /*if(firstChoise===false) {
            lockClicks = true;
        }*/
        //await sleep(300);
        
        console.log(currentPlayer);
        if (currentPlayer % agentsAmount !== 0 || lockClicks || card_num > 1) {
            if(currentPlayer % agentsAmount === 0)
                console.log("too much clicks");
            return;
        }
        
        parent = $(this).parent();
        var p_row = parent.attr("ws-Row");
        var p_col = parent.attr("ws-Column");
        img[card_num] = document.createElement('img');
        img[card_num].id = "cardId";
        img[card_num].src = "/MemoryGame/resources/Card_photos/"+board.boardArray[parseInt(p_row)][parseInt(p_col)].name+".jpeg";
        img[card_num].alt = "cow";
        img[card_num].width = 70;
        img[card_num].height = 70;
        $(this).append(img[card_num]);
        card_num = card_num + 1;
        //await sleep(data.personalTime / 3);
        //lockClicks = false;
        //$(img).fadeOut();
        if (firstChoise) {
            firstChoise = false;
            choicesIndexes[0] = [p_row, p_col];
            turn.PickCard(board.boardArray[p_row][p_col]);
            
        } else {
            lockClicks = true; // lock the clicks after second card choise
            
            //firstChoise = true;
            choicesIndexes[1] = [p_row, p_col];
            IsPair(choicesIndexes);
            //save documentation of the turn with 
            
            turn.PickCard(board.boardArray[p_row][p_col]);
            //alert(choicesIndexes[0].concat( choicesIndexes[1]));
            if (remainingCards === 0) {
                document.getElementById("board").innerHTML = "<h1>game over</h1>";
            }
            
            //firstChoise = true;
            choicesIndexes = {}; // initilize the choices
            await sleep(1000);
            for(image of img){
                
                $(image).fadeOut();
            }
        }
        //alert(turn);
        turnsDocumentation = turnsDocumentation.concat(turn);
        
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function CreateBoard(row, column) {
    tableTag = '';
    tableTag += "<table id=\"memoryTable\">"
    for (let i = 0; i < row; i++) {
        tableTag += "<tr id=\"row " + i + "\">"; // <tr id="row i">
        for (let j = 0; j < column; j++) {
            tableTag += "<td class=\"cardFrame\" ws-column=\"" + j + "\" ws-row=\"" + i + "\">\n<button  id=\"card\"/>\n</td>";
        }
        tableTag += "</tr>";
    }
    tableTag += "</table>";
    return tableTag;
}

async function IsPair(choicesIndexes) {
    //if (cardsNames[choicesIndexes[0][0]][choicesIndexes[0][1]] === cardsNames[choicesIndexes[1][0]][choicesIndexes[1][1]]) {
    if (board.boardArray[choicesIndexes[0][0]][choicesIndexes[0][1]].name === board.boardArray[choicesIndexes[1][0]][choicesIndexes[1][1]].name
    && board.boardArray[choicesIndexes[0][0]][choicesIndexes[0][1]].index !== board.boardArray[choicesIndexes[1][0]][choicesIndexes[1][1]].index) {
        console.log([choicesIndexes[0][0],choicesIndexes[0][1]]+","+[choicesIndexes[1][0],choicesIndexes[1][1]]);
        var table = $("#memoryTable")[0];
        var cell = table.rows[choicesIndexes[0][0]].cells[choicesIndexes[0][1]];
        await sleep(1000);
        $(cell).css({'visibility':'hidden'});
        cell = table.rows[choicesIndexes[1][0]].cells[choicesIndexes[1][1]];
        $(cell).css({'visibility':'hidden'});
        remainingCards -= 2;
        totalScore += 1;
        $("#total_score").text(totalScore);
       /* if(currentPlayer == 0){
            scores["agent0"] +=1 ;
            $(".player").find( ".score_agent" ).text(scores["agent"+currentPlayer]);
        } else{
            scores["agent"+currentPlayer] +=1;
            $("#agent"+currentPlayer).find( ".score_agent" ).text(scores["agent"+(currentPlayer + 1)]);
        }*/
        scores["agent"+currentPlayer] +=1;
        $("#agent" + currentPlayer).find("#score_text").text(scores["agent" + (currentPlayer)]);
        return true
    }
    return false
}

function getCards(num, rowsize) {
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



