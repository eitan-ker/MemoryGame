// A LIST OF ALL USERS
console.log("all users");
$.ajax({
    type: "GET",
    url: "/MemoryGame/Admin/GetAllUsers",
    contentType: "application/json",
    success: function (data) {
        alert("good");
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
                            cell.textContent = "replay BTN";
                        }
                    } else {
                        cell.textContent = parsedData[i - 1][parsedKeys[j - 1]];
                    }
                }
            }
            
        }
        document.body.appendChild(table);

        

        console.log(table);
    }

    
}


/*
//REPLY OF SPECIFIC USER
console.log("spcific user");
workerid = "436"
assid = "1"
hitid = "123"
var data = {WorkerId: workerid, AssId: assid, HitId: hitid}
var stringTosend = JSON.stringify(data);
console.log(stringTosend);
$.ajax({
    type: "POST",
    url: "/MemoryGame/Admin/GetReplyOfUser",
    data: stringTosend,
    contentType: "application/json",
    success: function (data) {
        alert("good");
    },
    error: function (errMsg) {
        alert("errMsg");
    }
});
*/
