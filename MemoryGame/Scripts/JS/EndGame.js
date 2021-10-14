var startTime;
var PlayerTime;
var BotTime;
var data;
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
    startTime = MyGetTime();


    // HARD CODED
    //data = [{ name: "player", score: 20, time: "00:15" }, { name: "agent 1", score: 20, time: "00:15" }, { name: "agent 2", score: 20, time: "00:15" }];


    let scores = JSON.parse(sessionStorage.getItem("scores"));
    let scoresSize = scores.length
    var data = [];
    for (let i = 0; i < scoresSize; i++) {
        let name2 = scores[i][name];
        let score2 = scores[i][score];
        data.push({ name: name2, score: score2, time: "00:15" }); // chnage time in dic
    }

    //let data = JSON.parse(sessionStorage.getItem("scores"));


    


    createUI(data);
   /* PlayerTime = sessionStorage.getItem('PlayerTime');
    BotTime = sessionStorage.getItem('BotTime');
    PageInfo.bob_time = BotTime;
    PageInfo.player_time = PlayerTime;
    document.getElementById('globalTimerPlayer').innerHTML = "so far: " + PlayerTime;
    document.getElementById('globalTimerBot').innerHTML = "so far: " + BotTime;
    console.log(PlayerTime);
    console.log(BotTime);*/
});

function createUI(data) {
    let number_of_agent = data.length;
    let player = document.getElementsByClassName("player")[0];
    $(player).find("#time_text").text(data[0].time);
    $(player).find("#score_text").text(data[0].score);
    player.setAttribute("id", "agent" + 0);
    for (let i = 1; i < number_of_agent; i++) {
        let player = document.getElementsByClassName("player")[0].cloneNode(true);
        player.setAttribute("id", "agent" + i);
        $(player).find("h4").text(data[i].name);
        $(player).find("#time_text").text(data[i].time);
        $(player).find("#score_text").text(data[i].score);
        //this.#scores["agent" + i] = data[i].score;
        document.getElementById("agent_area").appendChild(player);

    }
    let question = document.getElementsByClassName("agent")[0]
    $(question).find("#name").text(data[0].name);
    let input_list = question.getElementsByTagName("input")
    input_list[0].setAttribute("id", "time_" + String(data[0].name))
    input_list[1].setAttribute("id", "score_" + String(data[0].name))
    //$(question).find("#time").id ="time_" + String(data[0].name);
    //$(question).find("#score").id = "score_" + String(data[0].name);
    for (let i = 1; i < number_of_agent; i++) {
        question = document.getElementsByClassName("agent")[0].cloneNode(true);
        $(question).find("#name").text(data[i].name);
        input_list =question.getElementsByTagName("input")
        input_list[0].setAttribute("id", "time_" + String(data[i].name))
        input_list[1].setAttribute("id", "score_" + String(data[i].name))
        document.getElementById("question_area").appendChild(question);

    }
}

function checkAns() {

    let mistake = 0;
    let turn = []
    for (let i = 0; i < data.length; i++) {
        let time = document.getElementById("time_" + String(data[i].name)).value
        let score = document.getElementById("score_" + String(data[i].name)).value
        turn.push({ agent_name: data[i].name, time: time, score: score })
        if (time != data[i].time || score != data[i].score) {
            console.log(time, score)
            mistake = 1;
        }
    }

    if (!mistake) {
        NextPage();
    }
    else {
        disableAllButtons()
        show_and_hide('failed');
        show_and_hide('agree_button_id');
        PageInfo.mistakes++;
        PageInfo.MistakesInfo.push(turn);
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

    console.log(stringTosend);
   // window.location.replace("/Home/EndPage"); //to prevent page back
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/EndGameInfo",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            /*
            this.done = true;
            window.location.replace("/MemoryGame/Home/Feedback"); //to prevent page back
            */
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
    this.done = true;
    window.location.replace("/MemoryGame/Home/Feedback"); //to prevent page back
    

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


function show_and_hide(str) {
    var click = document.getElementById(str);
    if (click.style.display === "none") {
        click.style.display = "inline-block";
    } else {
        click.style.display = "none";
    }
}

function disableAllButtons() {
    var buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        var btn_id = buttons[i].getAttribute('id');
        if (btn_id != "failed_button") {
            document.getElementById(btn_id).setAttribute("disabled", false);
        }
    }
    var input = document.getElementsByTagName('input'); 
    for (let i = 0; i < input.length; i++) {
        var btn_id = input[i].getAttribute('class');
        if (btn_id != "failed_button") {
            document.getElementsByClassName(btn_id)[i].setAttribute("disabled", true);
        }
    }
}

function anableAllButton() {
    var buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        btn_id = buttons[i].getAttribute('id');
        document.getElementById(btn_id).removeAttribute("disabled");
    }

    var input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        var btn_id = input[i].getAttribute('class');
        if (btn_id != "failed_button") {
            document.getElementsByClassName(btn_id)[i].removeAttribute("disabled");
        }
    }
}
function anotherTry() {
    show_and_hide('failed');
    show_and_hide('agree_button_id');
    anableAllButton();
      
}