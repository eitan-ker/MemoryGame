var startTime;
var done = false;
$(function () {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "/MemoryGame/Data/GetInitData",
        // The key needs to match your method's input parameter (case-sensitive).
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            sessionStorage.setItem('configurationData', data);
        },
        error: function (errMsg) {
            alert('2');
        }
    });
    sessionStorage.setItem('currentPage', "InstructionsTwo");
    startTime = MyGetTime()
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
                    alert('3');
                }
            });
        }
    }
});
function NextPage() {
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "InstructionsTwo" }
    var stringTosend = JSON.stringify(data);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            done = true;
            window.location.replace("/MemoryGame/Home/interfaceExample"); //to prevent page back
        },
        error: function (errMsg) {
            alert('4');
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