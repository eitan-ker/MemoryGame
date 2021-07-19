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
//var board = new Board([2,2], [new Card([0,0], "cow"),new Card([0,1], "dog"),new Card([1,0], "cow"),new Card([1,1], "dog")]);
var turn;
var img = [];
var card_num = 0;
$(function () {
    $("#board_info").append("<p>Loading</p>");
    $("#board_info").find("p").css({
        fontSize: 40,
        'margin-top': ($("#board_info").height() - $("#board_info").find("p").height()) / 2
    });
    //data = sessionStorage.getItem('configurationData')

    //assume we've got data object from GET
    data = {
        overallTime: "",// times in milliseconds
        personalTime: 10000,
        numOfCards: [5, 2],
        numOfAgents: 2
    };
    agentsAmount = data.numOfAgents;
    gameManager = new GameManager(data.numOfCards, data.numOfAgents, data.personalTime,data);
    /*let player = new Agent1(()=>{
    } ,0)
    gameManager.AddAgent(player);*/
    //turn = new Turn(gameManager.getAgents()[0], gameManager);



    $("button").click(async function () {
        
        console.log(currentPlayer);
        if (currentPlayer % agentsAmount !== 0 || lockClicks || card_num > 1) {
            if(currentPlayer % agentsAmount === 0)
                console.log("too much clicks");
            return;
        }
        gameManager.ShowCard($(this));
        /*
            parent = $(this).parent();
            var p_row = parent.attr("ws-Row");
            var p_col = parent.attr("ws-Column");
            img[card_num] = document.createElement('img');
            img[card_num].id = "cardId";
            img[card_num].src = "/MemoryGame/resources/Card_photos/"+ gameManager.board.boardArray[parseInt(p_row)][parseInt(p_col)].name+".jpeg";
            img[card_num].alt = "cow";
            img[card_num].width = 70;
            img[card_num].height = 70;
            $(this).append(img[card_num]);
            card_num = card_num + 1;
        */
        
        /*if (firstChoise) {
            firstChoise = false;
            choicesIndexes[0] = [p_row, p_col];
            
            turn.PickCard(gameManager.board.boardArray[p_row][p_col]);

        } else {
            lockClicks = true; // lock the clicks after second card choise

            //firstChoise = true;
            choicesIndexes[1] = [p_row, p_col];
            IsPair(choicesIndexes);
            //save documentation of the turn with 

            turn.PickCard(gameManager.board.boardArray[p_row][p_col]);
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
        }*/
        //alert(turn);
        
        
        //gameManager.turnsArray = gameManager.turnsArray.concat(turn);
        //turn = new Turn(gameManager.currentTurn % data.numOfAgents, gameManager);
        
    });
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