/*
 * type of questions
 * 1 - scale
 * 2 - dropDown
 * 3 - text box
 * 
 * format of questions by type
 * < 1, quesiton, min, max ,baseValue>
 * < 2, question, option1, option2... >
 * < 3, question >
 */

var typeCounter = [0, 0, 0]
var typeContent = new Array(3);
var startTime;
var done = false;
$(function () {
    sessionStorage.setItem('currentPage', "feedback");
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
                    alert(errMsg);
                }
            });
        }
    }
    var i = 0;
    for (i = 0; i < questions.length; i++) {
        switch (questions[i].type) {
            case 1:
                typeCounter[0]++;
                break;
            case 2:
                typeCounter[1]++;
                break;
            case 3:
                typeCounter[2]++;
                break;
        }
    }
    
    i = 0;
    for (i = 0; i < typeContent.length; i++) {
        typeContent[i] = new Array(typeCounter[i])
    }
    generatePage();
    
});


var dropDownContent;
var sliderData;
var textBoxData;

const questions = [
    {
        type: 1,
        question: 'To what extent did you find the Agents to be a competent partners?',
        minRangeValue: 1,
        maxRangeValue: 10,
        baseValue: 1
    },
    {
        type: 3,
        question: 'Please explain your answer.'
    },
    {
        type: 1,
        question: 'To what extent are you satisfied with the Agents?',
        minRangeValue: 1,
        maxRangeValue: 10,
        baseValue: 1
    },
    {
        type: 1,
        question: 'To what extent do you find the Agents to be likeable?',
        minRangeValue: 1,
        maxRangeValue: 10,
        baseValue: 1
    },
    {
        type: 1,
        question: 'To what extent would you recommend the Agents to a friend, as a partners to work with?',
        minRangeValue: 1,
        maxRangeValue: 10,
        baseValue: 1
    },
    {
        type: 2,
        question: 'If you could choose - would you rather play with or without the Agents?',
        answers: [
            { text: 'With the Agents' },
            { text: 'Without the Agents' }
        ]
    },
    {
        type: 2,
        question: 'In your opinion, who contributed more to completing the game?',
        answers: [
            { text: 'With the Agents' },
            { text: 'Without the Agents' }
        ]
    },
    {
        type: 3,
        question: 'Please state any other thoughts you have about the Agents.'
    },
    {
        type: 3,
        question: 'Please state your general opinion and comments about the game. If you have any suggestions for improvement in the game/ HIT, they are also welcome.'
    }

]

function generatePage() {

    var scaleCounter = 1;
    var dropDownCounter = 1;
    var textBoxCounter = 1;

    var i = 0;
    var pageHTML = '';
    pageHTML += initialize();

    for (i = 0; i < questions.length; i++) {
        switch (questions[i].type) {
            case 1:
                pageHTML += scaleBuilder(questions[i], String(scaleCounter));
                scaleCounter++;
                break;
            case 2:
                pageHTML += dropDownBuilder(questions[i], String(dropDownCounter));
                dropDownCounter++;
                break;
            case 3:
                pageHTML += textBoxBuilder(questions[i], String(textBoxCounter));
                textBoxCounter++;
                break;
        }
    }
    pageHTML += addNextButton();
    document.getElementById('pageContainer').innerHTML += pageHTML;
}

function scaleBuilder(questionType, counter) {
    scaleSize = questionType.maxRangeValue - questionType.minRangeValue + 1;
    var i = 0;
    let html = '<div class= "QA"><div class="question"><h5>' + questionType.question + '</h5></div>';
    html += '<div class="likert" style="display: flex; justify-content: space-around; align-items: center; ">';
    html += '<div class="like_dislike" style="width: min-content;"><img class="like" id="dislike" src="/MemoryGame/resources/Images/dislike2.png"></div>'
    for (i = 0; i < scaleSize; i++) {
        var scaleId = String(counter) + 'rd' + String(i);
        html += '<div  class="likert_opt" onclick="scaleClicker(\'' + String(scaleId) + '\', ' + String(counter) + ')">';
        html += '<div class="single_likert"><input  id="' + String(scaleId) + '" name="grp' + counter + '" type="radio" value="' + String(i) + '"></div>';
        html += '<div class="likert_num"><h5>' + String(i) + '</h5></div>';
        if (i == 0) {
            html += '<div class="dislike"><h5> Not at all </h5></div>';
        } else if (i == scaleSize - 1) {
            html += '<div class="like"><h5> Very much </h5></div>';
        }
        html += '</div>';
    }
    html += '<div class="like_dislike" style="width: min-content;"><img class="like" id="like" src="/MemoryGame/resources/Images/like2.jpg"></div>'

    html += '</div></div>';
    return html;

}

function scaleClicker(option, typeCounter) {
    typeContent[0][typeCounter - 1] = document.getElementById(option).value;
}

// id has to be string, otherwise if we hav to many options then the id will be corrupted: 1+11 = 12, instead i want it to be 1-11
/*function dropDownBuilder(questionType, counter) {
   
    let html = '<div class="dropdown">';
    html += '<div class="question"><h6>' + questionType.question + '</h6></div >';
    html += '<div> <button onclick="dropDown_show_hide('+ counter +')" id="dropDownTitle'+ counter +'" class="button"></button>';
    html += ' <div class="drop_options" style="display:none;" id="drop-content'+ counter +'">';
    var i = 0;
    for (i = 0; i < questionType.answers.length; i++) {
        var id = String(counter) + "d" + String(i);
        html += '<div class="drop_option"> <button onclick="changeTitle(\'' + String(id) + '\', '+ String(counter) + ')" id="'+ counter + "d" + i + '"';
        html += ' class= "btn" href = "#" >' + questionType.answers[i].text + '</button > </br></div > ';
    } 
    html += ' </div ></br></div ></div >';
    return html;
} */

function dropDownBuilder(questionType, counter) {
    let html = '<div class= "QA"><div>'; 
    html += '<h5>' + questionType.question+'</h5>';
    html += '<div class="dropdown">';
    html += '<select id="dropdown' + counter + '" class="btn-default dropdown-toggle">';
    html += '<option value="">-- Select one --</option>'
    var i = 0;
    for (i = 0; i < questionType.answers.length; i++) {
        html += '<option value="' + questionType.answers[i].text + '">' + questionType.answers[i].text+'</option>'
    }
    html += '</select></div></div></div >';
    return html;
}



function textBoxBuilder(questionType, counter) {
    let html = ' <div class= "QA"><div class="question"><h5>' + questionType.question + '</h5></div >' ;
    html += '<div><textarea class="text_input"  id = "textBox' + String(counter) +'" placeholder = "Answer here"></textarea></div></div>';
    return html;
}

// dropDown related function 
function dropDown_show_hide(typeCounter) {

    var uniqueId = 'drop-content' + String(typeCounter);

    var click = document.getElementById(uniqueId);
    if (click.style.display === "none") {
        click.style.display = "block";
    } else {
        click.style.display = "none";
    }
}

// dropDown related function
function changeTitle(option, typeCounter) {

    dropDown_show_hide(typeCounter);
    var uniqueId = 'dropDownTitle' + String(typeCounter);
    document.getElementById(uniqueId).innerHTML = document. getElementById(option).innerHTML

    typeContent[1][typeCounter-1] = document.getElementById(uniqueId).innerHTML;
  //  dropDownContent = document.getElementById(option).innerHTML
}

function initialize() {
    var html = '<div><h4>Thank you and Bob for solving the boards!</h4>';
    html += '<h5> We would appreciate your help answering the following questions about this HIT.</h5>';
    html += '<h5>Your sincere and detailed answers are veluable to us, so please answer honestly.</h5></div> ';
    html += '<div class="page_head_line"><h4> Feedback Question</h4></div>'
    return html;
}

function addNextButton() {
    var html = '<div class="clickers"> ';
    html += '<button class="Green_Button" onclick="nextPage()" id="btn1">Submit Feedback</button>';
    html += ' </div>';
    return html;
}

function nextPage() {
    var i = 0;
    // textBox insert into typeContent
    for (i = 0; i < typeContent[2].length; i++) {
        var id = 'textBox' + String(i + 1);
        typeContent[2][i] = document.getElementById(id).value;
    }
    // dropdown insert into typeContent
   for (i = 0; i < typeContent[1].length; i++) {
        var id = 'dropdown' + String(i + 1);
        typeContent[1][i] = document.getElementById(id).value;
    }

    var questionsAarr = [];
    for (j = 0; j < 3; j++) {
        for (i = 0; i < questions.length; i++) {
            switch (questions[i].type) {
                case (j+1):
                    questionsAarr.push(questions[i].question);
                    break;
            }
        }
    }
    
    done = true;
    var t = { Questions: questionsAarr, Answers: typeContent }
    var qa = JSON.stringify(t);
    console.log(qa);
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/FeedBackInfo",
        // The key needs to match your method's input parameter (case-sensitive).
        data: qa,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            sendTime()
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });

// next page


}
function sendTime() {
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "feedback" }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            done = true
            window.location.replace("/MemoryGame/Home/EndPage");
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