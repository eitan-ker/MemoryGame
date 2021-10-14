// A LIST OF ALL USERS
console.log("all users");
$.ajax({
    type: "GET",
    url: "/MemoryGame/Admin/GetAllUsers",
    contentType: "application/json",
    success: function (data) {
        dataTable(data);
    },
    error: function (errMsg) {
        alert("errMsg");
    }
});

function dataTable(data) {

    var parsedData = JSON.parse(data);
    console.log(parsedData);

    // if the list if empty - popup an alert
    if (parsedData.length == 0) {
        alert("list of Replay is empty");
    } else {
        var colNum = Object.keys(parsedData[0]).length;
        // number of cols must be +2 because 1 for index and one for replay button
        colNum = colNum + 2;
        var parsedKeys = Object.keys(parsedData[0])
        let table = document.createElement('table');
        table.setAttribute("class", "table");
        // one extra row for the cols names
        for (let i = 0; i < parsedData.length + 1; i++) {
            let row = table.insertRow();
            row.setAttribute("class", "tableHeadLine")
            for (let j = 0; j < colNum; j++) {
                if (i == 0) {
                    let cell = row.insertCell();
                    if (j == 0 || j == colNum - 1) {
                        if (j == 0) {
                            cell.textContent = "index";
                        } else {
                            cell.textContent = "Run Replay";
                        }
                    } else {
                        cell.textContent = parsedKeys[j - 1];
                    }
                } else {
                    let cell = row.insertCell();
                    row.setAttribute("class", "tableRow")

                    if (j == 0 || j == colNum - 1) {
                        if (j == 0) {
                            cell.textContent = i;
                        } else {
                            // "0000" is a unique char to differ between the ids
                            cell.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button"'
                                + 'onClick = "runReplay(' + parsedData[i - 1][parsedKeys[0]] + "0000" + parsedData[i - 1][parsedKeys[1]] + "0000" + parsedData[i - 1][parsedKeys[2]] +')" > '
                            + '<span class="glyphicon glyphicon-pencil"></span>Run Replay</button>';

                        }
                    } else {
                        cell.textContent = parsedData[i - 1][parsedKeys[j - 1]];
                    }
                }
            }
            
        }
        document.body.appendChild(table);

    }

    
}



function runReplay(replayData) {
    let str = replayData.toString();
    // "0000" is a unique char to differ between the ids
    const ids = str.split("0000");
    console.log(ids);


    //REPLY OF SPECIFIC USER
    console.log("spcific user");
    var workerid = ids[0].toString()
    var assid = ids[1].toString()
    var hitid = ids[2].toString()
    var data = { WorkerId: workerid, AssId: assid, HitId: hitid }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Admin/GetReplyOfUser",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {

            const obj = JSON.parse(data);
            console.log(obj);
            console.log(obj._gameModel.configuration.numOfCards);

            sessionStorage.setItem("size", JSON.stringify(obj._gameModel.configuration.numOfCards));
            sessionStorage.setItem("turnsArray", JSON.stringify(obj._gameModel.turnInfo));
            sessionStorage.setItem("boardImages", JSON.stringify(obj._gameModel.initBoard));
            sessionStorage.setItem("config", JSON.stringify(obj._gameModel.configuration));


            window.location.replace("/MemoryGame/Home/Replay");


//            await this.Replay();


            
            // send data to replay and run
        },
        error: function (errMsg) {
            alert("errMsg");
        }
    });

}


/*
function Replay(){
        window.location.replace("/MemoryGame/Home/Replay");
        document.getElementById("board").innerHTML = this.CreateBoard(size[0], size[1]);
        let lastTurnTime = 0;
        for (let turn1 in this.#turnsArray) {
            if(turn1.GetFirstTurnTime() != null){
                let time = turn1.GetFirstTurnTime().getSeconds();
                sleep((time - lastTurnTime) % 60);
                let firstCard = turn1.GetFirstCard();
                this.pickCard(firstCard[0], firstCard[1]);
                lastTurnTime = time;
            }
            if(turn.GetSecondTurnTime() != null){
                let time = turn1.GetSecondTurnTime().getSeconds();
                sleep((time - lastTurnTime) % 60);
                let firstCard = turn1.GetFirstCard();
                this.pickCard(firstCard[0], firstCard[1]);
                lastTurnTime = time;
            }
        }
    }
*/