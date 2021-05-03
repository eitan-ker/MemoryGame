var startTime;
var done = false;
$(function () {
    sessionStorage.setItem('currentPage', "SecondTimeError");
    startTime = MyGetTime()
    window.onunload = function () {

        var endTime = this.MyGetTime()

        var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "SecondTimeError" }
        var stringTosend = JSON.stringify(data);
        console.log(stringTosend);
        //[beginTime, endTime, "ConsentIndex"];
        $.ajax({
            type: "POST",
            url: "/MemoryGame/Data/TimeInPage",
            data: stringTosend,
            contentType: "application/json",
            success: function (data) {
            },
            error: function (errMsg) {

                alert("time is wrong");
            }
        });

    }
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
                    alert("client is done wrong");
                }
            });
        }
    }
});


function returnToAmazon() {
    //// replace this url to amazon
    //window.location.replace("/MemoryGame/Home/InstructionsOne");
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