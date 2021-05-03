var InitGameInfo;
var score = 0;
var UserTime = 0;
var AgentTime = 0;
var UserTurn = 1;
var BoardInfo;
var turnInfo=[];
var matrix = []
var matrixAnswers = [];
var interval;
var timeLeftOnThisTurn;
var InfoGame = [];
var numOfMistakes = 0;
var submits = [];
var tempSubmit = []
var timeOfStartingTurn = 0;
var arrayOfCellPress = []

var agentInstructionsIndex = 0;
var intervalAgent;
var showAnsInterval;
var done = false;
var stratTime;
$(function () {
    startTime = MyGetTime()
    sessionStorage.setItem('currentPage', "Game");
    window.onbeforeunload = function () {
        if (this.done == false) {
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "/MemoryGame/Data/ClientIsDone",
                // The key needs to match your method's input parameter (case-sensitive).
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                },
                error: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
    }
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "/MemoryGame/Data/GetInitGameInfo",
        // The key needs to match your method's input parameter (case-sensitive).
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data)
            InitGameInfo = data
            
            timeOfStartingTurn = MyGetTime()
            initMatrix();
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
    /*InitGameInfo = {
        scoreTarget : 14,
        timeForTurn : 30,
        agentInstructions : [[1, 10], [2, 5,15,25,35], [2, 4,8,12,16,20,26], [1, 32], [1, 5], [1, 10], [1, 12], [1, 11]],
    };
    initMatrix();
    timeOfStartingTurn = MyGetTime()*/
});
function checkAnswer() {
    flag = 0;
    console.log([arrayOfCellPress, MyGetTime()])
    tempSubmit.push({ Indexs: arrayOfCellPress.slice(), Time: MyGetTime() });
    if (arrayOfCellPress.length == BoardInfo.Indexs.length) {
        for (k = 0; k < arrayOfCellPress.length; k++) {
            for (w = 0; w < BoardInfo.Indexs.length; w++) {

                console.log("array" + arrayOfCellPress[k].i + "  index" + BoardInfo.Indexs[w].col)
                if ((arrayOfCellPress[k].row == BoardInfo.Indexs[w].row) && (arrayOfCellPress[k].col == BoardInfo.Indexs[w].col)) {
                    flag += 1;
                }
            }
          
        }
        if (flag == arrayOfCellPress.length) {
            return true;
        }
    }


    numOfMistakes++;
    return false;

}
/*
function checkWord(rowDown, columnDown, rowUp, columnUp) {
    let lenOfWord = BoardInfo.Word.length;
    if ((rowDown == BoardInfo.Indexs[0].row) && (columnDown == BoardInfo.Indexs[0].col)) {
        if ((rowUp == BoardInfo.Indexs[lenOfWord - 1].row) && (columnUp == BoardInfo.Indexs[lenOfWord - 1].col)) {
            return true;
        }
    } else if ((rowDown == BoardInfo.Indexs[lenOfWord - 1].row) && (columnDown == BoardInfo.Indexs[lenOfWord - 1].col)) {
        if ((rowUp == BoardInfo.Indexs[0].row) && (columnUp == BoardInfo.Indexs[0].col)) {
            return true;
        }

    }
    numOfMistakes++;
    return false;

}
*/
// this function start the turn - send requst to the server and get the Board information
function initMatrix() {
   
    var params = {
        type: "GET",
        dataType: 'json',
        url: "/MemoryGame/Data/GetBoard",
        success: function (data) {
            console.log(data);
            // save the data from the server in the Board Info object
            window.BoardInfo = data
            // save the Board info in the turn info object
            turnInfo.push(BoardInfo)
            tempSubmit =[]
            console.log(submits)
            console.log(BoardInfo);
            // init the matrix without letter
            initMatrixletter();
            // create the matrix table and the functionalot on the table
            createMatrixTable()
        },
        error: function (data) {
            alert("error!");
        }
    };
    $.ajax(params);
}
// initialization the matrix with the size of board that the server send
function initMatrixletter() {
    for (var i = 0; i < window.BoardInfo.Size; i++) {
        var row = [];

        for (var j = 0; j < window.BoardInfo.Size; j++) {
            row.push(' ');
        }

        matrix.push(row);
    }
}
// create table with the matrix from the board info, and initialization the functionalty in the table - if this the user turn
// he initialization lissener to the cell's, and if this the agent turn he tart agent turn function.
function createMatrixTable() {
    console.log("create is start");
    var html = '';
    if (score == 0) {
        html += '<table id="puzzleTableBot">';
        console.log("window.BoardInfo.Size" + window.BoardInfo.Size)
        for (var i = 0; i < window.BoardInfo.Size; i++) {
            html += '<tr>';
            for (var j = 0; j < window.BoardInfo.Size; j++) {
                html += '<td class="wordsearch" ws-column="' + j + '" ws-row="' + i + '">';
                html += window.BoardInfo.Board[i][j];
                html += '</td>';
            }
            html += '</tr>';
        }
        html += '</table>';
        document.getElementById('BotTable').innerHTML = html;
        document.getElementById('InstructionsBot').innerHTML = "find the word: ";
        document.getElementById('wordBot').innerHTML = window.BoardInfo.Word;
        document.getElementById('BotBoardDiv').style.visibility = "hidden";
        html=''
    }
    if (UserTurn)
        html += '<table id="puzzleTable">';
    else
        html += '<table id="puzzleTableBot">';
    console.log("window.BoardInfo.Size" + window.BoardInfo.Size)
    for (var i = 0; i < window.BoardInfo.Size; i++) {
        html += '<tr>';
        for (var j = 0; j < window.BoardInfo.Size; j++) {
            html += '<td class="wordsearch" ws-column="' + j + '" ws-row="' + i + '">';
            html += window.BoardInfo.Board[i][j];
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    if (UserTurn) {
        document.getElementById('timeLeftPlayer').innerHTML = Math.floor(InitGameInfo.timeForTurn / 60) + ":" + (InitGameInfo.timeForTurn % 60);
        document.getElementById('PlayerTable').innerHTML = html;
        document.getElementById('InstructionsPlayer').innerHTML = "find the word: ";
        document.getElementById('wordPlayer').innerHTML = window.BoardInfo.Word;
        document.getElementById('InstructionsPlayer').style.visibility = "visible";
        document.getElementById('wordPlayer').style.visibility = "visible";
        $("td.wordsearch").click(function () {
            elementDown = this;
            var rowIndex = $(elementDown).attr("ws-Row");
            var columIndex = $(elementDown).attr("ws-Column");
            console.log("the cell is press" + rowIndex + ", " + columIndex)
            // if the cell is alredy click, we remove it from the array and change the state for not click
            if (checkIndexInArrayAndRemoveIfTrue(rowIndex, columIndex)) {
                document.getElementById('puzzleTable').rows[rowIndex].cells[columIndex].style.backgroundColor = "inherit"

            } else {
                arrayOfCellPress.push({ row: parseInt( rowIndex), col: parseInt(columIndex) });
                document.getElementById('puzzleTable').rows[rowIndex].cells[columIndex].style.backgroundColor = "#7FFFD4"
            }
           
        });
       
    }
    else {
        document.getElementById('timeLeftBot').innerHTML = Math.floor(InitGameInfo.timeForTurn / 60) + ":" + (InitGameInfo.timeForTurn % 60);
        document.getElementById('BotTable').innerHTML = html;
        document.getElementById('InstructionsBot').innerHTML = "find the word: "
        document.getElementById('wordBot').innerHTML =  window.BoardInfo.Word;
        document.getElementById('InstructionsBot').style.visibility = "visible";
        agentPlay();
        //document.getElementById('PlayerTable').innerHTML = html;  
    }
    // make the event hendler of mousedown and mouseup
    startTimer();
    
    arrayOfCellPress = [];
}
//this function menage the agent turn, he check what the instraction and start timer to the relevant function.
function agentPlay() {

    let instract = InitGameInfo.agentInstruction[agentInstructionsIndex];
    console.log("instarction for agent =" + instract);
    switch (instract[0]) {
        case 1:
            intervalAgent = setTimeout(function () {
                arrayOfCellPress = BoardInfo.Indexs
                checkAnswer()
                showCorrectAns();
            }, (instract[1]+1) * 1000);
            break;
        case 2:

            for (i = 1; i < instract.length - 1; i++) {
                if (instract[i] < InitGameInfo.timeForTurn) {
                    setTimeout(function () {
                        chooseRandomForAgent()
                        numOfMistakes += 1;
                    }, (instract[i] + 1) * 1000)
                }
           
            }
            if (instract[instract.length -1] < InitGameInfo.timeForTurn) {
                setTimeout(function () {
                    showCorrectAns();
                }, (instract[instract.length - 1] + 1) * 1000);
            }
            break;
        default:
            console.log("the type of the agent instraction is not ok.")
    }

    agentInstructionsIndex++;
}
// this function choose random row and randow column that is not the good answer, and choose randomly
// the diraction that me want, and show the cells in the table for 1 second.
function chooseRandomForAgent() {
    let randRow = 0
    let randCol = 0;
    let i = 0
    // this while find random cell and random column that is not the right answer
    while (true) {
        randRow = Math.floor(Math.random() * BoardInfo.Size)
        randCol = Math.floor(Math.random() * BoardInfo.Size)

        if ((randCol == BoardInfo.Indexs[0].col) && (randRow == BoardInfo.Indexs[0].row)) {
            continue;
        }
        if ((randCol == BoardInfo.Indexs[BoardInfo.Indexs.length - 1].col) && (randRow == BoardInfo.Indexs[BoardInfo.Indexs.length - 1].row)) {
            continue;
        }
        else break;
    }
    console.log("the random that chosen is " + randRow + " ," + randCol)
    let array = []
    let wordSize = BoardInfo.Indexs.length
    // this if condition's find the diraction that we can go from the randRow and randCol and put in the array. 
    if (randRow - (wordSize-1) >= 0) {
        array.push(0)
    }
    if ((randRow - (wordSize-1) >= 0) && (randCol + (wordSize-1) < BoardInfo.Size)) {
        array.push(1)
    }
    if (randCol + (wordSize-1) < BoardInfo.Size) {
        array.push(2)
    }
    if ((randRow + (wordSize-1) < BoardInfo.Size) && (randCol + (wordSize-1) < BoardInfo.Size)) {
        array.push(3)
    }
    if (randRow + (wordSize-1) < BoardInfo.Size) {
        array.push(4)
    }
    if ((randRow + (wordSize-1) < BoardInfo.Size) && (randCol - (wordSize-1) >= 0)) {
        array.push(5)
    }
    if (randCol - (wordSize-1) >= 0) {
        array.push(6)
    }
    if ((randRow - (wordSize-1) >= 0) && (randCol - (wordSize-1) >= 0)) {
        array.push(7)
    }
    console.log(array)
    // choose random element from the array
    let chose = Math.floor(Math.random() * array.length)
    console.log(chose)
    // put the cell's that we want to press in the arrayOfCellPress.
    switch (array[chose]) {
        case 0:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow - i, j: randCol });
            }
            break;
        case 1:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow - i, j: randCol+i });
            }
            break;
        case 2:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow, j: randCol+i });
            }
            break;
        case 3:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow + i, j: randCol+i });
            }
            break;
        case 4:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow + i, j: randCol });
            }
            break;
        case 5:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow + i, j: randCol-i });
            }
            break;
        case 6:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow, j: randCol -i });
            }
            break;
        case 7:
            for (i = 0; i < wordSize; i++) {
                arrayOfCellPress.push({ i: randRow - i, j: randCol -i});
            }
            break;
        default:
            console.log("error with the random")

    }
    console.log(arrayOfCellPress)
    //change the color in the cell's that press
    for (let k = 0; k < arrayOfCellPress.length; k++) {
        let rowIndex = arrayOfCellPress[k].i;
        let columIndex = arrayOfCellPress[k].j;
        document.getElementById('puzzleTableBot').rows[rowIndex].cells[columIndex].style.backgroundColor = "#7FFFD4"
    }
    checkAnswer()
    //timer for change the cell's color to inherit.
    setTimeout(function () {
        for (let k = 0; k < arrayOfCellPress.length; k++) {
            let rowIndex = arrayOfCellPress[k].i;
            let columIndex = arrayOfCellPress[k].j;
            document.getElementById('puzzleTableBot').rows[rowIndex].cells[columIndex].style.backgroundColor = "inherit"

        }
        arrayOfCellPress = [];
    }, 1000)
    

}
// restart the cell press - change the color in the cell to defult and clean the arrayOfCellPress
function restartCellPress() {
    for (k = 0; k < arrayOfCellPress.length; k++) {
        let rowIndex = arrayOfCellPress[k].i;
        let columIndex = arrayOfCellPress[k].j;
        document.getElementById('puzzleTable').rows[rowIndex].cells[columIndex].style.backgroundColor = "inherit"
    }
    arrayOfCellPress = [];
}
//this function check if cell is already press, if not return false, and if he already press he remove it from the array and return true.
function checkIndexInArrayAndRemoveIfTrue(i, j) {
    for (k = 0; k < arrayOfCellPress.length; k++) {
        //console.log(arrayOfCellPress[k].i)
        if ((arrayOfCellPress[k].row == i) && (arrayOfCellPress[k].col == j)) {
            arrayOfCellPress.splice(k, 1);
            return true;
        }
    }
    return false;
}
// this function save all the information that we want to save about the turn.
function saveInfo() {
    submits.push(tempSubmit);
    console.log(submits)
    //submitArray: submits,turnInfo: turnInfo
    var info = { numOfMistakes: numOfMistakes, startTime: timeOfStartingTurn, endTime: MyGetTime(), isClient: UserTurn, submitArray: submits, turnInfo: turnInfo }
    console.log("the info is ")
    console.log(info);
    
    var stringTosend = JSON.stringify( info );
    $.ajax({
        async: false,
        type: "POST",
        url: "/MemoryGame/Data/TotalTurnInfo",
        // The key needs to match your method's input parameter (case-sensitive).
        data: stringTosend,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
    
    submits =[]
    turnInfo = [];
    numOfMistakes = 0;
}
// this function manage the end of turn oparation - save the data, update the score, check if the game is over, and if no
//the change the turn and start the new turn
function endOfTurn() {
    saveInfo();
    updateScore();
    if (score == InitGameInfo.scoreTarget) {
        endGame();
    }
    changeTurn();
    initMatrix();
}
// this function manage the front visablity for exchange turn.
function changeTurn() {
    clearInterval(window.interval);
    //change the turn
    UserTurn = (UserTurn + 1) % 2
    if (UserTurn) {
        //document.getElementById('botCurrentTimer').innerHTML = "time left: ";
        document.getElementById('PlayerBoardDiv').style.visibility = "visible";

        document.getElementById('BotBoardDiv').style.visibility = "hidden";
        document.getElementById('leftArrow').style.visibility = "visible";
        document.getElementById('rightArrow').style.visibility = "hidden";
        document.getElementById('timerDivPlayer').style.visibility = "visible";
        document.getElementById('timerDivBot').style.visibility = "hidden";
        document.getElementById('InstructionsBot').style.visibility = "hidden";
        /*
        AgentTime += (61000 - timeLeftOnThisTurn);
        let minutes = Math.floor((UserTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((UserTime % (1000 * 60)) / 1000);
        document.getElementById('globalTimerBot').innerHTML = minutes + ":" + seconds;
        */
    }
    else {
       // document.getElementById('userCurrentTimer').innerHTML = "time left: ";
        document.getElementById('BotBoardDiv').style.visibility = "visible";
        document.getElementById('PlayerBoardDiv').style.visibility = "hidden";
        document.getElementById('rightArrow').style.visibility = "visible";
        document.getElementById('leftArrow').style.visibility = "hidden";
        document.getElementById('timerDivBot').style.visibility = "visible";
        document.getElementById('timerDivPlayer').style.visibility = "hidden";
        document.getElementById('InstructionsPlayer').style.visibility = "hidden";
        document.getElementById('wordPlayer').style.visibility = "hidden";
       /* UserTime += (61000 - timeLeftOnThisTurn);
        let minutes = Math.floor((AgentTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((AgentTime % (1000 * 60)) / 1000);
        document.getElementById('globalTimerPlayer').innerHTML = minutes + ":" + seconds;
        */
       /*
        var inter = setInterval(function () {
           
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var timePlayed =now-timeOfStartingTurn ;

            var minutes = Math.floor((timePlayed % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timePlayed % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"

            // If the count down is finished, write some text
            if (seconds > 10) {
                clearInterval(inter);
                endOfTurn();
                //document.getElementById("demo").innerHTML = "EXPIRED";
            }
        }, 10000);
        */
    }
    //timeOfStartingTurn = new Date().getTime();
    
}
// this function save the time that is start, and start interval for the clock update.
function startTimer() {
    var countDownDate = new Date(new Date().getTime() + ((InitGameInfo.timeForTurn+1) *1000));

    // Update the count down every 1 second
    window.interval = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        timeLeftOnThisTurn = countDownDate - now;

        var minutes = Math.floor((timeLeftOnThisTurn % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeftOnThisTurn % (1000 * 60)) / 1000);


        // If the count down is finished, write some text
        if (timeLeftOnThisTurn < 0) {
            timesUp();
            //document.getElementById("demo").innerHTML = "EXPIRED";
        } else {

            // Display the result in the element with id="demo"
            if (minutes < 10) {
                minutes = '0' + minutes
            }
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            if (UserTurn) {
                document.getElementById('timeLeftPlayer').innerHTML =  minutes + ":" + seconds;

                UserTime += 1;
                let minutesglobal = Math.floor((UserTime /60));
                let secondsglobal = Math.floor((UserTime % 60));
                if (minutesglobal < 10) {
                    minutesglobal = '0' + minutesglobal
                }
                if (secondsglobal < 10) {
                    secondsglobal = '0' + secondsglobal
                }
                document.getElementById('globalTimerPlayer').innerHTML = minutesglobal + ":" + secondsglobal ;
            } else {
                document.getElementById('timeLeftBot').innerHTML =  minutes + ":" + seconds;

                AgentTime += 1;
                let minutesglobal = Math.floor((AgentTime / 60));
                let secondsglobal = Math.floor((AgentTime % 60));
                if (minutesglobal < 10) {
                    minutesglobal = '0' + minutesglobal
                }
                if (secondsglobal < 10) {
                    secondsglobal = '0' + secondsglobal
                }
                document.getElementById('globalTimerBot').innerHTML = minutesglobal + ":" + secondsglobal;
            }
        }


    }, 1000);
}
// if the time over and the user click on the button, we start a new turn
function timeOver() {
    submits.push(tempSubmit )
    initMatrix();
}
// this function manage the the case that the time is over, and show to the user text and button before initialization new table
var timesUp = () => {
    clearInterval(window.interval);
    if (UserTurn) {
        var userHhtml = '<div id="swithchingTurnsScreen"><h2>time\'s up for user</h2><img id="clock" src=\"/clock.jpg" width="70" height="70" position:"center" /><br /><br /><Button id="cb" class="Green_Button" onclick=timeOver() position:bottom>Click to continue</button></div>';
        document.getElementById('PlayerTable').innerHTML = userHhtml;
        document.getElementById('InstructionsPlayer').style.visibility = "hidden";

    } else {
        var botHhtml = '<div id="swithchingTurnsScreen"><h2>time\'s up for Bob</h2><img id="clock" src=\"/clock.jpg" width="70" height="70" position:"center"/><br /><br /><Button class="Green_Button" onclick=timeOver()>Click to continue</button></div>';
        document.getElementById('BotTable').innerHTML = botHhtml;
        document.getElementById('InstructionsBot').style.visibility = "hidden";
        clearTimeout(intervalAgent);
    }
};

// this function change the color in the correct cell's, and after 1 second it's ending the turn
function showCorrectAns() {
   
    console.log("showCorrectAns");
    let id;
    if (UserTurn)
        id = "puzzleTable"
    else
        id = "puzzleTableBot";
    for (k = 0; k < BoardInfo.Indexs.length; k++) {
        let row = BoardInfo.Indexs[k].row;
        let col = BoardInfo.Indexs[k].col;
        document.getElementById(id).rows[row].cells.item(col).style.backgroundColor = "#00ff00"
    }
    clearInterval(window.interval);
    showAnsInterval = setTimeout(function () {
        for (k = 0; k < BoardInfo.Indexs.length; k++) {
            let row = BoardInfo.Indexs[k].row;
            let col = BoardInfo.Indexs[k].col;
            document.getElementById(id).rows[row].cells.item(col).style.backgroundColor = "inherit"
        }
        endOfTurn();
    },1000)
}
// increse the score by one, and update the html with the new score
function updateScore() {
    score++;
    var scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.innerHTML = "Boards Completed: " + score;
}
// this function save the time in the session storage, send the data for the server and replace the page to the end page.
function endGame() {
    done = true;
    // save the player time and the agent time in te session storage for the next page.
    sessionStorage.setItem('PlayerTime', document.getElementById('globalTimerPlayer').innerHTML);
    sessionStorage.setItem('BotTime', document.getElementById('globalTimerBot').innerHTML);
    // send all the information
    sendTime();
}

function sendTime() {
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "Game" }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            window.location.replace("/MemoryGame/Home/EndGame");
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
}
// function for the button - if this the user turn we check the cells that press, and if its the same its show the currect answer and start new turn,
//if is the agent turn it's dont do nothing.
function submit() {
    
    if (UserTurn) {
        if (checkAnswer()) {
            showCorrectAns();
        } else {
            restartCellPress();
            console.log("wrong answer, plese try again")
        }
    } else {
       
    }
    
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
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}