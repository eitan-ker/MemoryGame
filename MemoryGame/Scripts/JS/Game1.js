var query;
var cow = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
var dog = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
var cards = [[cow, dog], [cow, dog]];
var cardsNames = [["cow", "dog"], ["cow", "dog"]];
var firstChoise = true;
var choicesIndexes = {};
var turns = [];
var remainingCards;
var size;
var currentPlayer = 0;
var agentsAmount;
var score = 0;
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
        numOfCards: 2,
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
    

    var agents = get_agents(data.numOfAgents, {
        get_last_cards_show: (x)=> {
            return [];
        },
        get_all_card: () =>{
            return [0, 1];
        }
    })
        /*
        function () { 
            console.log("player");
            //$($( "#agent_area" ).children()[0]).css("background-color", "yellow"); 
    }, 
        function () { 
            console.log("agent1");
            //$($( "#agent_area" ).children()[0]).css("background-color", "darkgrey");
            //$($( "#agent_area" ).children()[1]).css("background-color", "yellow");
    },
    function () { console.log("agent2"); }, function () { console.log("agent3"); }
    */
    getCards(data.numOfCards *10);
    if( data!= undefined){
        agentsAmount = data.numOfAgents;
    }
    
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
        agents[currentPlayer].choose_pair();
    }, data.personalTime)

    //Initialize board
    document.getElementById("board").innerHTML = CreateBoard(data.numOfCards);
    remainingCards = data.numOfCards * data.numOfCards;
    
    //Initialize agents area with desired num of agents
    
    for (let i = 0; i < data.numOfAgents - 1; i++) {
        let player = document.getElementsByClassName("player")[0].cloneNode(true);
        player.setAttribute("id", "agent" + i);
        $(player).find( "h4" ).text("agent " + (i + 1));
        document.getElementById("agent_area").appendChild(player);
        
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
        img.src = cards[parseInt(p_row)][parseInt(p_col)];
        img.alt = "cow";
        img.width = 65;
        img.height = 65;
        
        //$(this).css("background-color", "yellow")
        //var imageUrl = cards[parseInt(p_row)][parseInt(p_col)];
        //$(this).css({ "background-image": "url(" + imageUrl + ")", "background - position": "center", "background - repeat": "no - repeat", "background - size": "auto" });
        $(this).append(img);
        await sleep(3000);
        $(img).fadeOut();
        $(this).css("background-color", "cadetblue")
        if (firstChoise) {
            firstChoise = false;
            choicesIndexes[0] = [p_row, p_col];
        } else {
            firstChoise = true;
            choicesIndexes[1] = [p_row, p_col]
            IsPair(choicesIndexes);
            turns.concat(choicesIndexes);
            
            if (remainingCards == 0) {
                document.getElementById("board").innerHTML = "<h1>game over</h1>";
            }
            lockClicks = true; // lock the clicks after second card choise
            firstChoise = true;
            choicesIndexes = {}; // initilize the choices
        }
        
        
    });
   
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function CreateBoard(size) {
    tableTag = '';
    tableTag += "<table id=\"memoryTable\">"
    for (let i = 0; i < size; i++) {
        tableTag += "<tr id=\"row " + i + "\">"; // <tr id="row i">
        for (let j = 0; j < size; j++) {
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
        score += 1;
        $("#total_score").text(score);
    }
}






function getCards(num) {
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
        names_array.push(array[choosen_card[i]]);
    }
    // return the array with names for the cards.
    return names_array;
}



function checkTime(i) {
    if (i < 10) 
        i = "0" + i;  // add zero in front of numbers < 10
    return i;
}

//get current UTC Time
function MyGetTime() {
    let now = new Date();
    let year = now.getUTCFullYear();
    let month = checkTime(now.getUTCMonth() + 1);
    let day = checkTime(now.getUTCDate());
    let hour = checkTime(now.getUTCHours());
    let minute = checkTime(now.getUTCMinutes());
    let second = checkTime(now.getUTCSeconds());
    return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
}



