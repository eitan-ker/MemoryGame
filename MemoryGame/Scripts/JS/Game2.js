var query;
var cow = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg';
var dog = 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5';
var cards; 
var cardsNames;
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

var turn;
var img = [];
var card_num = 0;
var hint_lock = false;
var timeOver = false;
$(function () {
    $("#board_info").append("<p>Loading</p>");
    $("#board_info").find("p").css({
        fontSize: 40,
        'margin-top': ($("#board_info").height() - $("#board_info").find("p").height()) / 2
    });
    //data = sessionStorage.getItem('configurationData')

    // Data is the configuration object
    //assume we've got data object from GET
    data = {
        overallTime: 5000000,// times in milliseconds
        personalTime: 100000,
        numOfCards: [3, 4],
        numOfAgents: 2,
        typeOfAgent:["OptimalAgent","BadAgent"],
        // 1 - showing first live card on board.
        // 2 - showing random live card on board.
        // 3 - showing last seen card pair.
        hintConfig: 3 
    };
    agentsAmount = data.numOfAgents;
    gameManager = new GameManager(data.numOfCards, data.numOfAgents,data.typeOfAgent, data.personalTime,data, null);


    /*
     * getHint1() - showing first live card on board.
     * getHint2() - showing random live card on board.
     * getHint3() - showing last seen card partner.
     */
    $("button").click(async function () {
        if (this.id == "hint") {

            switch (data.hintConfig) {
                case 1:
                    await gameManager.GetHint1();
                    break;
                case 2:
                    await gameManager.GetHint2();
                    break;
                case 3:
                    await gameManager.GetHint3();
                    break;
            }
            return
        }
        console.log(currentPlayer);
        if (currentPlayer % agentsAmount !== 0 || lockClicks || card_num > 1) {
            if(currentPlayer % agentsAmount === 0)
                console.log("too many clicks");
            return;
        }
        await gameManager.ShowCard($(this));
        
        
    });
    postInfo = gameManager.GetTurnsInfo()
    setTimeout(function (){
        $("#board_zone").fadeOut();
        $.post('MemoryGame/Controllers/Data',   // url
            {  }, // data to be submit
            function(data, status, jqXHR) {// successfull callback
               alert("information has been sent");
            })
        gameManager.endOfGame();
        
    }, data.overallTime);
    
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*async function IsPair(choicesIndexes) {
    board = gameManager.GetBoard();
    //if (cardsNames[choicesIndexes[0][0]][choicesIndexes[0][1]] === cardsNames[choicesIndexes[1][0]][choicesIndexes[1][1]]) {
    if (board[choicesIndexes[0][0]][choicesIndexes[0][1]].name === board[choicesIndexes[1][0]][choicesIndexes[1][1]].name
        && board[choicesIndexes[0][0]][choicesIndexes[0][1]].index !== board[choicesIndexes[1][0]][choicesIndexes[1][1]].index) {
        console.log([choicesIndexes[0][0], choicesIndexes[0][1]] + "," + [choicesIndexes[1][0], choicesIndexes[1][1]]);
        var table = $("#memoryTable")[0];
        var cell = table.rows[choicesIndexes[0][0]].cells[choicesIndexes[0][1]];
        await sleep(1000);
        $(cell).css({'visibility': 'hidden'});
        cell = table.rows[choicesIndexes[1][0]].cells[choicesIndexes[1][1]];
        $(cell).css({'visibility': 'hidden'});
        remainingCards -= 2;
        totalScore += 1;
        $("#total_score").text(totalScore);
        /* if(currentPlayer == 0){
             scores["agent0"] +=1 ;
             $(".player").find( ".score_agent" ).text(scores["agent"+currentPlayer]);
         } else{
             scores["agent"+currentPlayer] +=1;
             $("#agent"+currentPlayer).find( ".score_agent" ).text(scores["agent"+(currentPlayer + 1)]);
         }*//*
        gameManager.addScorePerAgent("agent" + currentPlayer);
        $("#agent" + currentPlayer).find("#score_text").text(gameManager.getScorePerAgent("agent" + (currentPlayer)));
    }
}*/
/*
async function IsPair(choicesIndexes) {
    let board = gameManager.getBoard();
    //if (cardsNames[choicesIndexes[0][0]][choicesIndexes[0][1]] === cardsNames[choicesIndexes[1][0]][choicesIndexes[1][1]]) {
    if (board.boardArray[choicesIndexes[0][0]][choicesIndexes[0][1]].name === board.boardArray[choicesIndexes[1][0]][choicesIndexes[1][1]].name
        && board.boardArray[choicesIndexes[0][0]][choicesIndexes[0][1]].index !== board.boardArray[choicesIndexes[1][0]][choicesIndexes[1][1]].index) {
        console.log([choicesIndexes[0][0], choicesIndexes[0][1]] + "," + [choicesIndexes[1][0], choicesIndexes[1][1]]);
        var table = $("#memoryTable")[0];
        var cell = table.rows[choicesIndexes[0][0]].cells[choicesIndexes[0][1]];
        await sleep(1000);
        $(cell).css({ 'visibility': 'hidden' });
        cell = table.rows[choicesIndexes[1][0]].cells[choicesIndexes[1][1]];
        $(cell).css({ 'visibility': 'hidden' });
        remainingCards -= 2;
        totalScore += 1;
        $("#total_score").text(totalScore);
        /* if(currentPlayer == 0){
             scores["agent0"] +=1 ;
             $(".player").find( ".score_agent" ).text(scores["agent"+currentPlayer]);
         } else{
             scores["agent"+currentPlayer] +=1;
             $("#agent"+currentPlayer).find( ".score_agent" ).text(scores["agent"+(currentPlayer + 1)]);
         }*//*
        scores["agent" + currentPlayer] += 1;
        $("#agent" + currentPlayer).find("#score_text").text(scores["agent" + (currentPlayer)]);
        return true
    }
    return false
}*/