class HandlerHistory {
    #gameManager
    constructor(gameManager) {
        this.#gameManager = gameManager;
    }
    getAgents(){
        return this.#gameManager.getAgents();
    }
    getAllTurns(){
        return this.#gameManager.getAllTurns();
     }
    getLastTurn(){
        let Turns = this.#gameManager.getAllTurns();
        return Turns[0];

    }
    getLastPlayer(){
        let turn = this.#gameManager.getAllTurns()[0];
        return turn.whoPlayed;
    }
    getNumOfTurn(){
        return this.#gameManager.getAllTurns().length;
    }
    getAllTurnPerAgent(nameOfAgent){
        let answer = []
        let turns = this.#gameManager.getAllTurns();
        for (let i; i = 0; i < turns.length) {
            if (turns[i].whoPlayed == nameOfAgent) {
                answer.push(turn[i]);
            }
        }
        return answer;
    }
    getAllTimeTurnsPerAgent(nameOfAgent) {
        return this.#gameManager.getAllTimeTurnsPerAgent(nameOfAgent);
    }
    getScorePerAgent(string){
        return this.#gameManager.getScorePerAgent();
    }

}

class HandlerStatus {
    #gameManager
    constructor(gameManager) {
        this.#gameManager = gameManager;
    }
    getBoardDimensins(){
        return this.#gameManager.getBoardDimensins();
    }
    getLiveCards(){
        return this.#gameManager.getLiveCards();
    }
    getNumOfCardOnBoard(){
        return this.#gameManager.getNumOfCardOnBoard();
    }
    getCard(row,col){
        return this.#gameManager.getCard(row,col);
    }
    getAllPairExposed(){
        return this.#gameManager.getAllPairExposed();
    }
    pickCard(row,col){
        return this.#gameManager.pickCard(row, col);
    }
    getHint(){
        return this.#gameManager.getHint();
    }
    getSecondHalf(row,col){
        return this.#gameManager.getSecondHalf(row, col);
    }
}