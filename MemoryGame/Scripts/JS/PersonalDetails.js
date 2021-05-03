var numOfTries = 0;
var startTime;
var allAnswers = []
var Questions = []
var done = false;
$(function () {
    sessionStorage.setItem('currentPage', "PersonalDetails");
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
    Questions.push("age")
    Questions.push("gender")
    Questions.push("country")
    Questions.push("education")
    Questions.push("captcha")
    Questions.push("How many minutes are there in three hours?")

    
});
function SubmitAnswers() {
    var flag = 0
    var error=""
    numOfTries++;

    var answers = [];
    // fill in answers.
    var age = document.getElementById('age_id').value;
    answers.push(age);

    var gender = document.getElementById('gender_id').value;
    answers.push(gender);

    var country = document.getElementById('country_id').value;
    answers.push(country);

    var education = document.getElementById('education_id').value;
    answers.push(education);

    var cap = document.getElementById('cap_id').value;
    answers.push(cap);

    var minutes = document.getElementById('minutes_id').value;
    answers.push(minutes);
    allAnswers.push(answers)
    // validation - check if all of them are not null or empty.
    var i;
    var len = answers.length;
    for (i = 0; i < len; i++) {
        if ((answers[i] == "") || (answers[i] == null)) {
            error = "Please answer all the questions."
            flag=1
        }
    }
    if (!flag) {
        if ((age < 18) || (age > 120)) {
            error = "Invalid age.";
            flag=1
        }
        if (minutes != 180) {
            error="Invalid number of minutes. Please try again";
            flag=1
        }
        if (cap != "BLtE#T") {
            error = "Invalid capatche. Please try again"
            flag=1
        }
    }
    

    if (flag) {
        disableAllButtons()
        document.getElementById('errorText').innerHTML = error
        show_and_hide();
        // this is the 3d mistake
        if (numOfTries > 2) {
            var stringTosend = JSON.stringify({ questions: Questions, ArrayOfAnswers: allAnswers, tries: numOfTries, success: false });
            // write data.
            $.ajax({
                type: "POST",
                url: "/WordSearchAMT/Data/PersonalDetailsInfo",
                data: stringTosend,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function () {
                    nextPage("/WordSearchAMT/Home/TooManyTries");
                },
                error: function (jqXHR, exception) {
                    nextPage("/WordSearchAMT/Home/ErrorPage")
                }
            });
        }
        return;
    }
    if (numOfTries < 4) {
        var bla = { questions: Questions, ArrayOfAnswers: allAnswers, tries: numOfTries, success: true }
        var stringTosend = JSON.stringify( bla);
        console.log(stringTosend);
        $.ajax({
            type: "POST",
            url: "/WordSearchAMT/Data/PersonalDetailsInfo",
            data: stringTosend,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function () {
                done = true;
                nextPage("/WordSearchAMT/Home/Game");
            },
            error: function (jqXHR, exception) {
                //alert("Something went wrong. Please contact the HIT requester.");
                nextPage("/WordSearchAMT/Home/ErrorPage");
            }
        });  
    }

}
/*function Next() {
    window.location.replace("/Consent/Index"); //to prevent page back
}*/
function nextPageFordev() {
    done = true;
    nextPage("/WordSearchAMT/Home/Game");
}
function nextPage(url) {
    done = true;
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "PersonalDetails" }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/WordSearchAMT/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            window.location.replace(url);
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

function disableAllButtons() {
    var buttons = document.getElementsByTagName('select');
    var input = document.getElementsByTagName('input'); 

    document.getElementById('cont_str_info_id').setAttribute("disabled", true);
    
    for (let i = 0; i < buttons.length; i++) {
        btn_id = buttons[i].getAttribute('id');
        if (btn_id != "failed_button") {
            document.getElementById(btn_id).setAttribute("disabled", true);
        }
    }
    for (let i = 0; i < input.length; i++) {
        btn_id = input[i].getAttribute('id');
        if (btn_id != "failed_button") {
            document.getElementById(btn_id).setAttribute("disabled", true);
        }
    }
}

function anableAllButton() {
    var buttons = document.getElementsByTagName('select');
    var input = document.getElementsByTagName('input'); 

    for (let i = 0; i < buttons.length; i++) {
        btn_id = buttons[i].getAttribute('id');
        document.getElementById(btn_id).removeAttribute("disabled");
    }
    for (let i = 0; i < input.length; i++) {
        btn_id = input[i].getAttribute('id');
        document.getElementById(btn_id).removeAttribute("disabled");
    }
    document.getElementById('cont_str_info_id').removeAttribute("disabled");
}
function anotherTry() {
    show_and_hide();
    anableAllButton();
   
}

function show_and_hide() {
    var click = document.getElementById("failed");
    if (click.style.display === "none") {
        click.style.display = "block";
    } else {
        click.style.display = "none";
    }
}