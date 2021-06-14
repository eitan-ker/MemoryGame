var currentPlayer=-1;
var agentsAmount;
var choicesIndexes = {};
var turn;
$(function () {
    $("#board_info").append("<p>Loading</p>");
    $("#board_info").find("p").css({
        fontSize: 40,
        'margin-top': ($("#board_info").height() - $("#board_info").find("p").height()) / 2
    });
    //assume we've got data object from GET
    data = {
        overallTime: "",// times in milliseconds
        personalTime: 8000,
        numOfCards: [5, 2],
        numOfAgents: 2
    };
    agentsAmount = data.numOfAgents;
    gameManager = new GameManager(data.numOfCards, data.numOfAgents, data.personalTime);
    let player = new Agent1(()=>{
        
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
            img[card_num].src = "/MemoryGame/resources/Card_photos/"+ gameManager.board.boardArray[parseInt(p_row)][parseInt(p_col)].name+".jpeg";
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
    } ,0)
    gameManager.agents[0] = player;
    turn = new Turn(gameManager.agents[0], gameManager.board, gameManager);
});