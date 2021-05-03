var startTime;
var PlayerTime;
var BotTime;
var PageInfo = { player_time: "", bob_time: "", mistakes: 0, MistakesInfo: [] };
var done = false
$(function () {
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
    sessionStorage.setItem('currentPage', "EndGame");
    startTime = MyGetTime()
    PlayerTime = sessionStorage.getItem('PlayerTime');
    BotTime = sessionStorage.getItem('BotTime');
    PageInfo.bob_time = BotTime;
    PageInfo.player_time = PlayerTime;
    document.getElementById('globalTimerPlayer').innerHTML = "so far: " + PlayerTime;
    document.getElementById('globalTimerBot').innerHTML = "so far: " + BotTime;
    console.log(PlayerTime);
    console.log(BotTime);
});
function checkAns() {
    var answerOfPlayerTime = document.getElementById('PlayerMinutes').value;
    var answerOfBotTime = document.getElementById('BobMinutes').value;
    if ((answerOfBotTime == BotTime) && (answerOfPlayerTime == PlayerTime)) {
        NextPage();
    }
    else {
        disableAllButtons()
        show_and_hide();
        PageInfo.mistakes++;
        PageInfo.MistakesInfo.push({ answerPlayer: answerOfPlayerTime, answerBob: answerOfBotTime });
    }
}

function NextPage() {
    done = true;
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "EndGame" }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            sendInfo();
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
}
function sendInfo() {
    var stringTosend = JSON.stringify(PageInfo);

    console.log(PageInfo);
   // window.location.replace("/Home/EndPage"); //to prevent page back
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/EndGameInfo",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            this.done = true;
            window.location.replace("/MemoryGame/Home/Feedback"); //to prevent page back
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


function show_and_hide() {
    var click = document.getElementById("failed");
    if (click.style.display === "none") {
        click.style.display = "block";
    } else {
        click.style.display = "none";
    }
}

function disableAllButtons() {
    var buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        btn_id = buttons[i].getAttribute('id');
        if (btn_id != "failed_button") {
            document.getElementById(btn_id).setAttribute("disabled", false);
        }
    }
}

function anableAllButton() {
    var buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        btn_id = buttons[i].getAttribute('id');
        document.getElementById(btn_id).removeAttribute("disabled");
    }
}
function anotherTry() {
    show_and_hide();
    anableAllButton();
   
}