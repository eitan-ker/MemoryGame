var query;
var cow = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
var dog = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
var cards = [[cow, dog], [cow, dog]];
var cardsNames = [["cow", "dog"], ["cow", "dog"]];
var firstChoise = true;
var choicesIndexes = {};
var turnsDocumentation = [];
var turn = {};
var remainingCards;
var size;
var currentPlayer = -1;
var agentsAmount;
var totalScore = 0;
var scores = {
    "agent0":0
};
var globalTime = new Date(0);
var lockClicks;
var crads_dict = {};
var data = {};
crads_dict["cow"] = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
crads_dict["dog"] = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
$(function () {

    //assume we've got data object from GET
    data = {
        overallTime: "",// times in milliseconds
        personalTime: 3000,
        numOfCards: 20,
        numOfAgents: 4
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
            return data1;
        });
    }
    data = GetData();
    alert(data.numOfAgents);*/
    
    
    var agents = [
        function () { 
            //console.log("player");
            //$($( "#agent_area" ).children()[0]).css("background-color", "yellow"); 
    }, 
        function () { 
            //console.log("agent1");
            //$($( "#agent_area" ).children()[0]).css("background-color", "darkgrey");
            //$($( "#agent_area" ).children()[1]).css("background-color", "yellow");
    },
    function () { //console.log("agent2"); 
         }
         , function () { //console.log("agent3"); 
    }]
    
    agentsAmount = data.numOfAgents;
    
    cards = getCards(data.numOfCards, 4);
    cardNames = cards;
    
    agentsAmount = data.numOfAgents;
    
    //sets the global time of the game.
    setInterval(function () {
        globalTime.setSeconds(globalTime.getSeconds() + 1);
        document.getElementById("time").innerHTML = globalTime.toLocaleTimeString();
    }, 1000);

    //set interval to change turns between players
    
    setInterval(function () {
        if (currentPlayer == agentsAmount - 1) {
            currentPlayer = 0;
            lockClicks = false;
            $($("#agent_area").children()[agentsAmount - 1]).css("background-color", "darkgrey");
            $($("#agent_area").children()[currentPlayer % data.numOfAgents]).css("background-color", "red");
        } else {
            currentPlayer += 1;
            lockClicks = true;
            firstChoise = true;
            choicesIndexes = {};
            $($("#agent_area").children()[currentPlayer % data.numOfAgents - 1]).css("background-color", "darkgrey");
            $($("#agent_area").children()[currentPlayer % data.numOfAgents]).css("background-color", "yellow");
        }
        agents[currentPlayer]();
    }, data.personalTime)

    //Initialize board
    document.getElementById("board").innerHTML = CreateBoard(4,data.numOfCards/4);
    remainingCards = data.numOfCards * data.numOfCards;
    
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
        console.log(currentPlayer);
        if (currentPlayer % agentsAmount != 0 || lockClicks) {
            return;
        }
        parent = $(this).parent();
        var p_row = parent.attr("ws-Row");
        var p_col = parent.attr("ws-Column");

        let img = document.createElement('img');
        img.id = "cardId";
        img.src = "/MemoryGame/resources/Card_photos/"+cards[parseInt(p_row)][parseInt(p_col)]+".jpeg";
        img.alt = "cow";
        img.width = 70;
        img.height = 70;
        
        //$(this).css("background-color", "yellow")
        //var imageUrl = cards[parseInt(p_row)][parseInt(p_col)];
        //$(this).css({ "background-image": "url(" + imageUrl + ")", "background - position": "center", "background - repeat": "no - repeat", "background - size": "auto" });
        $(this).append(img);
        await sleep(3000);
        $(img).fadeOut();
        //$(this).css("background-color", "cadetblue")
        if (firstChoise) {
            firstChoise = false;
            choicesIndexes[0] = [p_row, p_col];
            turn = turn.concat({
                choiseOne:choicesIndexes[0],
                time: new Date(globalTime.getMinutes(), globalTime.getSeconds())
            });
        } else {
            firstChoise = true;
            choicesIndexes[1] = [p_row, p_col]
            IsPair(choicesIndexes);
            //save documentation of the turn with 
            turn = turn.concat(
                {
                    choiseTow:choicesIndexes[1],
                    time: new Date(globalTime.getMinutes(), globalTime.getSeconds())
                }
            );
            alert(choicesIndexes[0], choicesIndexes[1]);
            if (remainingCards == 0) {
                document.getElementById("board").innerHTML = "<h1>game over</h1>";
            }
            lockClicks = true; // lock the clicks after second card choise
            firstChoise = true;
            choicesIndexes = {}; // initilize the choices
            
        }
        alert(turn);
        turnsDocumentation.concat(turn);
        turn = {}; 
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
            tableTag += "<td class=\"cardFrame\" ws-column=\"" + j + "\" ws-row=\"" + i + "\">\n<button id=\"card\"/>\n</td>";
        }
        tableTag += "</tr>";
    }
    tableTag += "</table>";
    return tableTag;
}

function IsPair(choicesIndexes) {
    if (cardsNames[choicesIndexes[0][0]][choicesIndexes[0][1]] == cardsNames[choicesIndexes[1][0]][choicesIndexes[1][1]]) {
        var table = $("#memoryTable")[0];
        var cell = table.rows[choicesIndexes[0][0]].cells[choicesIndexes[0][1]];
        $(cell).hide();
        cell = table.rows[choicesIndexes[1][0]].cells[choicesIndexes[1][1]];
        $(cell).hide();
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
        $("#agent"+currentPlayer).find( ".score_agent" ).text(scores["agent"+(currentPlayer - 1)]);
    }
}

function getCards(num,rowsize) {
    // array of all the cards that we have in resources/Card_photos
    var array = ['alligator', 'anteater', 'artic-fox', 'badger', 'bat', 'bear', 'beaver', 'bird', 'bison', 'boar', 'bugs', 'camel', 'cat', 'chicken', 'cow', 'coyote', 'crab', 'crocodile', 'deer', 'dog', 'dolphin', 'donkey', 'duck', 'eagle', 'eel', 'elephant', 'fish', 'flamingo', 'fox', 'frog', 'giraffe', 'goat', 'gorilla', 'guinea-pig', 'hawk', 'hedgehog', 'hen', 'hippo', 'horse', 'hyena', 'iguana', 'jellyfish', 'kangaroo', 'killer-whale', 'koala', 'Lemur', 'leopard', 'lion', 'Lizard', 'llama', 'Lobster', 'mole', 'monkey', 'moose', 'mouse', 'narwhal', 'newt', 'octopus', 'ostritch', 'otter', 'owl', 'panda', 'parrot', 'peacock', 'penguin', 'pig', 'pigeon', 'plankton', 'platypus', 'polar-bear', 'puffin', 'quail', 'queen-bee', 'rabbit', 'racoon', 'rat', 'rhino', 'rooster', 'scorpion', 'seagul', 'seahorse', 'seal', 'shark', 'sheep', 'shrimp', 'skunk', 'sloth', 'snake-2', 'snake-3', 'snake', 'squid', 'squirrel', 'starfish', 'stingray', 'swordfish', 'tarantula', 'tiger', 'toucan', 'turtle', 'urchin', 'vulture', 'walrus', 'whale', 'wolf', 'x-ray-fish', 'yak', 'zebra']
    var choosen_card = [];
    //choose indexs for the cards
    while (choosen_card.length != num) {
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



