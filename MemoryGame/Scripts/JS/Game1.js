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
var noa;
var globalTime = new Date(0);
var lockClicks;
var crads_dict = {};
crads_dict["cow"] = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
crads_dict["dog"] = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
$(function () {
    //assume we've got data object from GET
    var data = {
        overallTime: "",// times in milliseconds
        personalTime: 5000,
        numOfCards: 2,
        numOfAgents: 4
    };
    
    var agents = [function () { console.log("player"); }, function () { console.log("agent1"); },
    function () { console.log("agent2"); }, function () { console.log("agent3"); }]

    noa = data.numOfAgents;
    //sets the global time of the game.
    setInterval(function () {
        globalTime.setSeconds(globalTime.getSeconds() + 1);
        document.getElementById("time").innerHTML = globalTime.toLocaleTimeString();
    }, 1000);

    //set interval to change turns between players
    
    setInterval(function () {
        if (currentPlayer == noa - 1) {
            currentPlayer = 0;
            lockClicks = true
        } else {
            currentPlayer += 1;
        }
        agents[currentPlayer]();
    }, data.personalTime)

    //Initilize baord
    document.getElementById("board1").innerHTML = CreateBoard(data.numOfCards);
    remainingCards = data.numOfCards * data.numOfCards;

    function IsPair(choicesIndexes) {
        if (cardsNames[choicesIndexes[0][0]][choicesIndexes[0][1]] == cardsNames[choicesIndexes[1][0]][choicesIndexes[1][1]]) {
            var table = $("#board")[0];
            var cell = table.rows[choicesIndexes[0][0]].cells[choicesIndexes[0][1]];
            $(cell).hide();
            cell = table.rows[choicesIndexes[1][0]].cells[choicesIndexes[1][1]];
            $(cell).hide();
            remainingCards -= 2;
        }
    }
  
    $("button").click(async function () {
        console.log(currentPlayer);
        if (currentPlayer % noa != 0 || lockClicks) {
            return;
        }
        parent = $(this).parent();
        var p_row = parent.attr("ws-Row");
        var p_col = parent.attr("ws-Column");

        let img = document.createElement('img');
        img.id = "cardId";
        img.src = cards[parseInt(p_row)][parseInt(p_col)];
        img.alt = "cow";
        img.width = 115;
        img.height = 115;
        
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
            turns.concat(choicesIndexes);//$()
            
            if (remainingCards == 0) {
                document.getElementById("board1").innerHTML = "<h1>game over</h1>";
            }
        }
        firstChoise = true;
        choicesIndexes = {};
        lockClicks = true;
    });
   
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function CreateBoard(size) {
    tableTag = '';
    tableTag += "<table id=\"board\">"
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











function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
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



