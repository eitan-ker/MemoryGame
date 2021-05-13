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
var data = {
    overallTime: "",// times in milliseconds
    personalTime: 8000,
    numOfCards: 4,
    numOfAgents: 2
};
var crads_dict = {};
crads_dict["cow"] = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
crads_dict["dog"] = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
$(function () {
    //Console.log(query);
    setInterval(MyGetTime, 1000);
    //document.getElementById("time").innerHTML = turnTime.toString();
    //get size as parameter from configuration 
    document.getElementById("board1").innerHTML = CreateBoard(2);
    remainingCards = data.numOfCards;
        
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
        
        parent = $(this).parent();
        var p_row = parent.attr("ws-Row");
        var p_col = parent.attr("ws-Column");

        let img = document.createElement('img');
        img.id = "cardId";
        img.src = cards[parseInt(p_row)][parseInt(p_col)];
        img.alt = "cow";
        img.width = 115;
        img.height = 115;
        

        $(this).append(img); 
        
        
        await sleep(3000);
        $(img).fadeOut();

        if (firstChoise) {
            firstChoise = false;
            choicesIndexes[0] = [p_row, p_col];
        } else {
            firstChoise = true;
            choicesIndexes[1] = [p_row, p_col]
            IsPair(choicesIndexes);
            turns.concat(choicesIndexes);$()
            if (remainingCards == 0) {
                document.getElementById("board1").innerHTML = "<h1>game over</h1>";
            }
        }
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
    let now = new Date(0);
    let year = now.getUTCFullYear();
    let month = checkTime(now.getUTCMonth() + 1);
    let day = checkTime(now.getUTCDate());
    let hour = checkTime(now.getUTCHours());
    let minute = checkTime(now.getUTCMinutes());
    let second = checkTime(now.getUTCSeconds());
    document.getElementById("time").innerHTML =  year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
}



