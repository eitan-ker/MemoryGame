var lastPage;
var startTime;
var done = false;
$(function () {
    lastPage = sessionStorage.getItem('currentPage');

    startTime = MyGetTime()
    var stringTosend = JSON.stringify({ lastPage: lastPage, stratTime: startTime })
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/ErrorInfo",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
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
}); 

function NextPage() {
    //data: JSON.stringify({ "beginTime": beginTime, "endTime": endTime, "nameOfPage": "ConsentIndex" }),
    // Get today's date and time
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "ErrorPage" }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            done = true;
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
            ////////need to replace the url to amazon!!!!!!!!
            //window.location.replace("/Home/InstructionsOne"); //to prevent page back
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });


}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
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