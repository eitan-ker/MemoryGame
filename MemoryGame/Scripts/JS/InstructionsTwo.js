var startTime;
var done = false;
$(function () {
    $.ajax({
        type: "Get",
        url: "/WordSearchAMT/Data/GetScore",
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            score = parseInt(data);
            sessionStorage.setItem('score_target', score);
            document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML.replace("20", data);
           // var newval = $('.Running_Text').text().replace("20", data);
            //console.log(newval)
           // $('.Running_Text').text(newval);
            score /= 2
            //newval = $('.Running_Text').text().replace("10", score);
            //$('.Running_Text').text(newval);
            document.getElementById("textbox").innerHTML = document.getElementById("textbox").innerHTML.replace("10", score);
            //document.getElementById("score_target").innerHTML = score;
            //document.getElementById("score_target_for_each").innerHTML = score;

        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
    sessionStorage.setItem('currentPage', "InstructionsTwo");
    startTime = MyGetTime()
    window.onbeforeunload = function () {
        if (this.done == false) {
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "/WordSearchAMT/Data/ClientIsDone",
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
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "InstructionsTwo" }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/WordSearchAMT/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            done = true;
            window.location.replace("/WordSearchAMT/Home/interfaceExample"); //to prevent page back
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