$(function () {
    /*
    Repalce the 4 vars from the sessionStorage to be initilized from Get Http request when the server
    will be ready to soppurt that.
    the arguments should be as follow:
    1.
    size - [row_dim, col_dim]
    turnsArray - the turns documantion array of the desired run.
    boardImages - a sringtinfy of the board of the desired run.
    config - the config object
     
    * */
    let size = JSON.parse(sessionStorage.getItem("size"));
    let turnsArray = JSON.parse(sessionStorage.getItem("turnsArray"));
    let boardImages = JSON.parse(sessionStorage.getItem("boardImages"));
    let config = JSON.parse(sessionStorage.getItem("config"));
    let gm = new GameManager(size, config.numOfAgents, config.personalTime,config, boardImages); 
    //let size = config.size;
    document.getElementById("board").innerHTML = gm.CreateBoard(size[0], size[1]);
    let totalTime = 0;
    if(turnsArray[turnsArray.length - 1].choosenCards.length == 2) {
        totalTime = new Date(turnsArray[turnsArray.length - 1].choosenCards[1].time).getSeconds() * 1000 + 5000;
    } else if(turnsArray[turnsArray.length - 1].choosenCards.length == 1) {
        totalTime = new Date(turnsArray[turnsArray.length - 1].choosenCards[0].time).getSeconds() * 1000 + 5000;
    } else {
        totalTime = new Date(turnsArray[turnsArray.length - 1].getTime).getSeconds() * 1000 + 5000;        
    }
    
    let lastTurnTime = 0;
    for (let i = 0; i < turnsArray.length; i++) {
        turn1 = new Turn(turnsArray[i].agent,turnsArray[i].getTime,turnsArray[i].numOfTurn);
        turn1.CreateDebugTurn(turnsArray[i].clicks, turnsArray[i].choosenCards, turnsArray[i].success);
        if(turnsArray[i].usedHint) {
            turn1.DebugHint(turnsArray[i].hint);
        }
        if(turn1.usedHint) {
            let sleepTime = turn1.GetHintTime().getSeconds();
            ReplayHint(gm,turn1,sleepTime);
        }
        if(turn1.GetFirstTurnTime() != null){
            let sleepTime = turn1.GetFirstTurnTime().getSeconds();
            //let sleepTime = ((time - lastTurnTime) % 60) * 1000;
            myFunction1(gm,turn1,sleepTime);
            //let _ =  sleep(sleepTime);
            // sleep(sleepTime);
            //setTimeout(function(){ gm.pickCard(turn1.choosenCards[0]["card"].index[0], turn1.choosenCards[0]["card"].index[1]); }, 3000);
            let firstCard = turn1.GetFirstCard();
            //gm.pickCard(turn1.choosenCards[0]["card"].index[0], turn1.choosenCards[0]["card"].index[1]);
            //lastTurnTime += time;
        }
        if(turn1.GetSecondTurnTime() != null){
            let sleepTime = turn1.GetSecondTurnTime().getSeconds();
            //let sleepTime = ((time - lastTurnTime) % 60) * 1000;
            //let _ =  sleep(sleepTime);
            // sleep(sleepTime);
            //setTimeout(function(){ gm.pickCard(turn1.choosenCards[1]["card"].index[0], turn1.choosenCards[1]["card"].index[1]); }, 3000);
            myFunction2(gm,turn1,sleepTime);
            let firstCard = turn1.GetFirstCard();
            //gm.pickCard(turn1.choosenCards[1]["card"].index[0], turn1.choosenCards[1]["card"].index[1]);
            //lastTurnTime += time;
        }
    }
    // EndReplay(totalTime);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function ReplayHint(gm, turn1, sleepTime){
    setTimeout(function(){
        console.log("turn:" + turn1.numOfTurn + "card 1" + "sleep:" + sleepTime);
        gm.GetHint();//(turn1.hint.card.index[0], turn1.hint.card.index[1]);
    }, sleepTime * 1000);
}
function myFunction1(gm, turn1, sleepTime) {
    setTimeout(function(){
        console.log("turn:" + turn1.numOfTurn + "card 1" + "sleep:" + sleepTime);
        gm.pickCard(turn1.choosenCards[0]["card"].index[0], turn1.choosenCards[0]["card"].index[1]);
    }, sleepTime * 1000);
}
function myFunction2(gm, turn1, sleepTime) {
    setTimeout(function(){
        console.log("turn:" + turn1.numOfTurn + "card 2" + "sleep:" + sleepTime);
        gm.pickCard(turn1.choosenCards[1]["card"].index[0], turn1.choosenCards[1]["card"].index[1]);
    }, sleepTime * 1000);
}

function EndReplay(sleepTime) {
    setTimeout(function(){
        window.location.replace("/MemoryGame/Home/EndGame"); //to prevent page back
    }, sleepTime);
    
}

/*function ReplayPickCard(card){
    gameManager.pickCard(card.GetIndex()[0], card.GetIndex()[1]);
}*/


/*
function GetFirstTurnTime(turn) {
    if(turn.choosenCards.length < 1) {
        return null
    }
    return new Date(turn.choosenCards[0].getFullYear(),turn.choosenCards[0].getMonth(),turn.choosenCards[0].getDay(),
        turn.choosenCards[0].getHours() ,turn.choosenCards[0].getMinutes(), turn.choosenCards[0].getSeconds(),
        turn.choosenCards[0].getMilliseconds());
}

function GetSecondTurnTime(turn) {
    if(turn.choosenCards.length < 2) {
        return null
    }
    return new Date(turn.choosenCards[1].getFullYear(),turn.choosenCards[1].getMonth(),turn.choosenCards[1].getDay(),
        turn.choosenCards[1].getHours() ,turn.choosenCards[1].getMinutes(), turn.choosenCards[1].getSeconds(),
        turn.choosenCards[1].getMilliseconds());
}
function GetFirstCard(turn){
    if(turn.choosenCards.length < 1){
        return null;
    }
    return [turn.choosenCards[0]["card"].GetIndex()[0], turn.choosenCards[0]["card"].GetIndex()[1]];
}

function GetSecondCard(turn){
    if(turn.choosenCards.length < 2){
        return null;
    }
    return [turn.choosenCards[1]["card"].GetIndex()[0], turn.choosenCards[1]["card"].GetIndex()[1]];
}
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}