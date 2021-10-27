$.ajax({
    type: "GET",
    url: "/MemoryGame/Admin/GetAllUsersData",
    contentType: "application/json",
    success: function (data) {
        arrangeData(data);
    },
    error: function (errMsg) {
        alert("errMsg");
    }
});

var numOfAgents = 0;
var mistakesInfo = {};
var dataForTable = [];
var QA = []

function arrangeData(data) {
    var parsedData = JSON.parse(data);
    var data_size = parsedData.length;

    console.log(parsedData);


    // push each player data to dic
    for (let i = 0; i < data_size; i++) {
        try {
            // amazon data extraction
            amazonInfo = parsedData[i]['_amazonInfoModel'];
            // endGame data
            endGameInfo = parsedData[i]['_endGameModel'];
            // feedback data
            feedbackInfo = parsedData[i]['_feedBackModels'];
            var answers_Arr = []
            var size1 = feedbackInfo['Answers'].length
            for (let j = 0; j < size1; j++) {
                var size2 = feedbackInfo['Answers'][j].length;
                for (let k = 0; k < size2; k++) {
                    answers_Arr.push(feedbackInfo['Answers'][j][k])
                }

            }
            for (let j = 0; j < answers_Arr.length; j++) {
                var q = feedbackInfo['Questions'][j];
                var a = answers_Arr[j];
                QA.push('Q: ' + q + '   A: ' + a);
            }

            // Game data extraction
            gameInfo = parsedData[i]['_gameModel'];
            var scores_size = gameInfo['scores'].length
            var agentsScore = 0;
            var playerScore = 0
            var allScores = gameInfo['scores']
            for (let j = 0; j < scores_size; j++) {
                if (allScores[j]['name'] != 'Player') {
                    agentsScore = agentsScore + allScores[j]['score'];
                } else {
                    playerScore = allScores[j]['score'];
                }
            }
            numOfAgents = gameInfo['agents'].length - 1;
            var gameLength = gameInfo['endTime'] - gameInfo['startTime'];
            gameLength = countMin(gameLength);
            var boardSize = gameInfo['configuration']['numOfCards'];
            boardSize = boardSize[0] + "x" + boardSize[1];
            var timePerTurn = gameInfo['configuration']['personalTime'];
            timePerTurn = countMin(timePerTurn);
            var timePerGame = gameInfo['configuration']['overallTime'];
            timePerGame = countMin(timePerGame);



            // calculate agents and player mistakes
            var agent_mistakes = 0;
            var player_mistakes = 0;

            var turnsLength = gameInfo['turnInfo'].length;
            for (let k = 0; k < turnsLength; k++) {
                if (gameInfo['turnInfo'][k]['success'] === false) {
                    var name = gameInfo['turnInfo'][k]['agent'];
                    if (name === "Player") {
                        player_mistakes += 1;
                    } else {
                        agent_mistakes += 1
                    }
                    mistakesInfo[name] = mistakesInfo[name] + 1;
                }
            }

            // Personal data extraction
            personalInfo = parsedData[i]['_personalDetails']['ArrayOfAnswers'][0];
            // time in pages data extraction
            timeInPages = parsedData[i]['_timeInPageModels'];
            var timesLength = timeInPages.length;
            var totalTime = Date.parse(timeInPages[timesLength - 1]['EndTime']) - Date.parse(timeInPages[0]['BeginTime']);
            totalTime = countMin(totalTime);
            var serveyLength = Date.parse(timeInPages[timesLength - 1]['EndTime']) - Date.parse(timeInPages[timesLength - 1]['BeginTime']);
            serveyLength = countMin(serveyLength);
            // Quiz data extraction
            verificationRulesInfo = parsedData[i]['_verificationRulesModels'];
            var dic = {
                workerId: amazonInfo['WorkerId'], assignmentId: amazonInfo['AssId'], HITId: amazonInfo['HitId'],
                Age: personalInfo[0], Gender: personalInfo[1], Country: personalInfo[2], Education: personalInfo[3],
                QuizMistakes: verificationRulesInfo['NumOfTries']-1, PlayerScore: playerScore, AgentsScore: agentsScore,
                NumberOfAgents: numOfAgents, BoardSize: boardSize,
                HITlength: totalTime, GameLength: gameLength, ServeyLength: serveyLength, PlayerNumMistakes: player_mistakes,
                AgentsNumMistakes: agent_mistakes, TimePerTurn: timePerTurn, TimePerGame: timePerGame,
                Q1: QA[0], Q2: QA[1], Q3: QA[2], Q4: QA[3], Q5: QA[4], Q6: QA[5], Q7: QA[6], Q8: QA[7], Q9: QA[8],
            }
             
           
         //   console.log(dic);


            QA = [];

            dataForTable.push(dic);
        } catch {
            console.log("bad data in DB");
        }

    }


    // calculate agents and player mistakes
    countMistakes(parsedData);

    loadData();
}

function countMistakes(parsedData) {
    // count max num of agents

    // count for each game num of mistakes per player/agent
    // for any agent that has not participated in the game mark X - did not play
}

function countMin(num) {
    var minutes = Math.floor(num / 60000);
    var seconds = ((num % 60000) / 1000).toFixed(0);
    totalTime = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    return totalTime;
}


//const datademo = [{ id: "1", score: "14", info: "bla", time_in_pages: "150" }, { id: "2", score: "15", info: "bla2", time_in_pages: "250" }];

const order = ["workerId", "assignmentId", "HITId", "Age", "Gender", "Country", "Education", "QuizMistakes",
    "HITlength", "GameLength", "ServeyLength", "BoardSize", "NumberOfAgents", "TimePerTurn", "TimePerGame",
    "PlayerScore", "AgentsScore", "PlayerNumMistakes", "AgentsNumMistakes", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6",
    "Q7", "Q8", "Q9"];
/*Q-A*/


function loadData() {
    makeTable(dataForTable);
}

function makeTable(data) {
    var array = [];
    var tablearea = document.getElementById('tabledata');
    var table = document.createElement("table");
    table.setAttribute("class", "table");
    var tr = document.createElement("tr");
    tr.setAttribute("class", "tableHeadLine");
    // make the header of the table
    for (var i = 0; i < order.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = order[i];
        th.setAttribute("id", order[i]);
        tr.appendChild(th);
    }
    table.appendChild(tr);
    // make row for each user
    for (var i = 0; i < data.length; i++) {
        array[i] = document.createElement('tr');
        array[i].setAttribute("class", "tableRow")
        for (var j = 0; j < Object.keys(data[i]).length; j++) {
            var td1 = document.createElement('td');
            td1.setAttribute("headers", Object.keys(data[i])[j]);
            var text1= document.createTextNode(data[i][order[j]]);
            td1.appendChild(text1);
            console.log(td1);
            array[i].appendChild(td1);
        }
        table.appendChild(array[i]);
    }
    tablearea.appendChild(table);    
}

function back() {
    window.location.replace("/MemoryGame/Admin/ChooseDataOrReplay");
}

