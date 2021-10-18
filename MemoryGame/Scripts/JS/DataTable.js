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

var dataForTable = [];

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
            // Personal data extraction
            personalInfo = parsedData[i]['_personalDetails']['ArrayOfAnswers'][0];
            // time in pages data extraction
            timeInPages = parsedData[i]['_timeInPageModels'];
            var timesLength = timeInPages.length;
            var totalTime = Date.parse(timeInPages[timesLength - 1]['EndTime']) - Date.parse(timeInPages[0]['BeginTime']);
            totalTime = countMin(totalTime);
            var gameLength = Date.parse(timeInPages[6]['EndTime']) - Date.parse(timeInPages[6]['BeginTime']);
            gameLength = countMin(gameLength);
            var serveyLength = Date.parse(timeInPages[timesLength - 1]['EndTime']) - Date.parse(timeInPages[timesLength - 1]['BeginTime']);
            serveyLength = countMin(serveyLength);
            // Quiz data extraction
            verificationRulesInfo = parsedData[i]['_verificationRulesModels'];
            var dic = {
                workerId: amazonInfo['WorkerId'], assignmentId: amazonInfo['AssId'], HITId: amazonInfo['HitId'],
                Age: personalInfo[0], Gender: personalInfo[1], Country: personalInfo[2], Education: personalInfo[3],
                QuizMistakes: verificationRulesInfo['AttempsInfo'].length - 1, PlayerScore: playerScore, AgentsScore: agentsScore,
                HITlength: totalTime, GameLength: gameLength, ServeyLength: serveyLength
            }
         //   console.log(dic);



            dataForTable.push(dic);
        } catch {
            console.log("bad data in DB");
        }

    }
    loadData();
}

function countMin(num) {
    var minutes = Math.floor(num / 60000);
    var seconds = ((num % 60000) / 1000).toFixed(0);
    totalTime = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    return totalTime;
}


//const datademo = [{ id: "1", score: "14", info: "bla", time_in_pages: "150" }, { id: "2", score: "15", info: "bla2", time_in_pages: "250" }];

const order = ["workerId", "assignmentId", "HITId", "Age", "Gender", "Country", "Education", "QuizMistakes", "PlayerScore",
    "AgentsScore", "HITlength", "GameLength", "ServeyLength"];

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

