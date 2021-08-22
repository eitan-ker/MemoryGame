$(function () {
    /*let boardSize = [4, 3];
    let gameManager = new GameManager(boardSize, 2, 10000, null);
    let lastTurnTime = 0;
    for (let turn in TurnsArray) {
        if(turn === undefined){
            continue;
        }
        if(turn.GetFirstTurnTime() != null){
            let time = turn.GetFirstTurnTime().getSeconds();
            sleep((time - lastTurnTime) % 60);
            lastTurnTime = time;
            
        }
        if(turn.GetSecondTurnTime() != null){
            let time = turn.GetSecondTurnTime().getSeconds();
            sleep((time - lastTurnTime) % 60);
            lastTurnTime = time;
        }
    }*/
});


/*function ReplayPickCard(card){
    gameManager.pickCard(card.GetIndex()[0], card.GetIndex()[1]);
}*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}