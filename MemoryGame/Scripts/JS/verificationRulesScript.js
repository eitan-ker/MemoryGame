﻿var startTime;
var numOfquestions;
var correctness = []
var indexOfAnswer = [];
var attempsInfo = new Array(3);
var questionElement;
var answerButtonsElement;
var maxNumOfAttempts = 3;
var iter = 0;
var answerCounter = 0;
var answerId;
var correctAnswersId;
var done = false;

$(function () {
    sessionStorage.setItem('currentPage', "verificationRules");
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
    numOfquestions = questions.length;
    answerId = new Array(numOfquestions);
    correctAnswersId = new Array(numOfquestions);
    for (i = 0; i < maxNumOfAttempts; i++) {
        attempsInfo[i] = new Array(numOfquestions);
        for (j = 0; j < numOfquestions; j++) {
            attempsInfo[i][j] = -1; // asign -1 cause no choices were made
        }
    }
    restartArrays();
    makeHtml();
    continue_btn.addEventListener('click', nextPage)
    startQuiz()
    assignCorrectAnswers(); // save correct buttons id.

});


const questionContainerElement = document.getElementById('question-container');
const continue_btn = document.getElementById('continue-btn');

const questions = [
    {
        question: 'When will the game end? Choose the most correct answer.',
        answers: [
            { text: 'When Bob has solved ' + sessionStorage.getItem('score_target') + ' boards alone', correct: false, index: 0 },
            { text: 'When I have solved ' + sessionStorage.getItem('score_target') + ' boards alone', correct: false, index: 1},
            { text: 'When Bob and I have solved ' + sessionStorage.getItem('score_target') + ' boards together', correct: true, index: 2 }
        ]
    },
    {
        question: 'Are you and Bob competing?',
        answers: [
            { text: 'yes', correct: false, index: 0},
            { text: 'no', correct: true, index: 1},
        ]
    },
    {
        question: 'What does the counter marked in blue indicate?',
        answers: [
            { text: 'The cumulative time Bob has been solving boards so far', correct: false, index: 0},
            { text: 'The cumulative time I have been solving boards so far', correct: true , index: 1 },
            { text: 'The cumulative time I have been solving the current board', correct: false , index: 2 },
        ]
    },
    {
        question: 'What does the counter marked in red indicate?',
        answers: [
            { text: 'The time left for me to solve the current board', correct: true, index: 0},
            { text: 'The time left to the completion of the HIT', correct: false, index: 1},
            { text: 'The time left for Bob to solve the current board', correct: false, index: 2},
        ]
    },
    {
        question: 'What happens if a player (you or Bob) fail to solve the board on time?',
        answers: [
            { text: 'A new board will appear for the other player', correct: false, index: 0},
            { text: 'A new board will appear for this player', correct: true, index: 1}
        ]
    }
]

function restartArrays() {
    for (i = 0; i < numOfquestions; i++) {
        correctness[i] = -1; // -1 for didn't make choice, 0 for wrong, 1 for right,  
        indexOfAnswer[i] = -1;
        answerId[i] = "-1";
    }
}

function assignCorrectAnswers() {
    for (j = 0; j < numOfquestions; j++) {
        elem_id = "btn-grid" + String(j);
        content = document.getElementsByClassName(elem_id)[0];
        kbButtons = content.getElementsByTagName("button");

        for (i = 0; i < kbButtons.length; i++) {
            btn_id = kbButtons[i].getAttribute('id');
            correct = document.getElementById(btn_id).dataset.correct;
            if (correct) {
                correctAnswersId[j] = btn_id;
            }
        }
    }

}

function makeHtml() {
    let html = "";
    for (let k = 0; k < questions.length; k++) {
        html += '<div id="question' + k + '">Question</div><div id="answer-buttons' + k + '" class="btn-grid'+ k +'"> </div>';
          /*  < button class="btn" > Answer 1</button >
                <button class="btn">Answer 2</button>
                <button class="btn">Answer 3</button>
            </div>
        "*/
    }
    document.getElementById('question-container').innerHTML = html;

     questionElement = [document.getElementById('question0'), document.getElementById('question1'),
    document.getElementById('question2'), document.getElementById('question3'),
    document.getElementById('question4')]

     answerButtonsElement = [document.getElementById('answer-buttons0'), document.getElementById('answer-buttons1'),
    document.getElementById('answer-buttons2'), document.getElementById('answer-buttons3'),
    document.getElementById('answer-buttons4')]
}
// here starting 

function startQuiz() {

   // deleteDraft()
    var i = 0
    //run the quiz but with 5 boxes of questions
    for (i = 0; i < questionElement.length; i++) {
        questionElement[i].innerText = questions[i].question
    }
    // not working for some reason 
    for (i = 0; i < numOfquestions; i++) {
        questions[i].answers.forEach(answer => {
            answerCounter = answerCounter + 1;
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')

            button.setAttribute("id", String(answerCounter));
            button.setAttribute("style", "color:black; border: none; background-color: rgb(240,248,255); font-weight: none;");

            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            let j = i;
            button.addEventListener('click', function (e) {
                checkSelected(j);
                selectAnswer(e, j);
                indexOfAnswer[j] = answer.index;
            }, false);
            answerButtonsElement[i].appendChild(button)
        })
    }

}
function checkSelected(divIndex) {
    elem_id = "btn-grid" + String(divIndex);
    content = document.getElementsByClassName(elem_id)[0];
    kbButtons = content.getElementsByTagName("button");
    for (i = 0; i < kbButtons.length; i++) {
        btn_id = kbButtons[i].getAttribute('id');
        document.getElementById(btn_id).style.border = "none";
    }

}

function deleteDraft() {
    for (i = 0; i < numOfquestions; i++) {
        while (answerButtonsElement[i].firstChild) {
            answerButtonsElement[i].removeChild(answerButtonsElement[i].firstChild)
        }
    }
    
}

// actuall behavior for choosing an answer
function selectAnswer(e, index) { // works only on choices that was clicked, -1 will stay as is for choices not clicked.
    const selectedButton = e.target

    elem_id = selectedButton.getAttribute('id')
    document.getElementById(elem_id).style.border = "solid black"; // mark selected option
    answerId[index] = elem_id;

    const correct = selectedButton.dataset.correct
    if (correct) {
        correctness[index] = 1
    } else {
        correctness[index] = 0
    }

    setStatusClass(document.body, correct)

   /* Array.from(answerButtonsElement[i].children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })*/
  
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function nextPage(e) {
    var i
    var counter = 0
    for (i = 0; i < numOfquestions; i++) {
        if (correctness[i] == 1) {
            counter ++
        }
    }
    clearAllMarks();
    assignAttempt();
    iter = iter + 1;
    if (counter == numOfquestions) {
        let dataOfVer = { Questions: questions, AttempsInfo: attempsInfo, NumOfTries: iter };

        let stringTosend = JSON.stringify(dataOfVer);

        $.ajax({
            type: "POST",
            url: "/WordSearchAMT/Data/VerificationRulesInfo",
            data: stringTosend,
            contentType: "application/json",
            success: function (data) {
                sendTime(0);
            },
            error: function (errMsg) {
                alert(errMsg);
            }
        }); 
    } else {
        markAnswersRedGreen();
        disableAllButtons()
        show_and_hide();
        //error page
        if (iter == 3) {
            let dataOfVer = {Questions: questions, AttempsInfo: attempsInfo, NumOfTries: iter };

            let stringTosend = JSON.stringify(dataOfVer);
            console.log(stringTosend);
            $.ajax({
                type: "POST",
                url: "/WordSearchAMT/Data/VerificationRulesInfo",
                data: stringTosend,
                contentType: "application/json",
                success: function (data) {
                    sendTime(1);
                },
                error: function (errMsg) {
                    alert(errMsg);
                }
            }); 
        
        // window.location.replace("/Home/PersonalDetails"); //change to relevant page.
        }
    }
}

function markAnswersRedGreen() {
    for (i = 0; i < numOfquestions; i++) {
        

        if (indexOfAnswer[i] != -1 && correctAnswersId[i] != answerId[i]) { // wrong answer color 
            document.getElementById(answerId[i]).style.background = "rgba(255, 0, 0, 0.8)";
            document.getElementById(answerId[i]).style.fontWeight = "bold";
        } else if (indexOfAnswer[i] != -1 && correctAnswersId[i] == answerId[i]) {        // color green
            document.getElementById(correctAnswersId[i]).style.background = "rgba(0, 128, 0, 0.8)";
            document.getElementById(correctAnswersId[i]).style.fontWeight = "bold";
        }
    }
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

function anotherTry() {
    show_and_hide();
    anableAllButton();
    clearAllMarks();
    restartArrays();
}

function clearAllMarks() {
    for (i = 0; i < answerId.length; i++) {
        document.getElementById(correctAnswersId[i]).style.border = "none";
        document.getElementById(correctAnswersId[i]).style.backgroundColor = "rgb(240,248,255)";
        document.getElementById(correctAnswersId[i]).style.fontWeight = "normal";

        if (indexOfAnswer[i] != -1 && answerId[i] != correctAnswersId[i]) {
            document.getElementById(answerId[i]).style.border = "none";
            document.getElementById(answerId[i]).style.backgroundColor = "rgb(240,248,255)";
            document.getElementById(answerId[i]).style.fontWeight = "normal";
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

function assignAttempt() {
    for (i = 0; i < numOfquestions; i++) {
        attempsInfo[iter][i] = indexOfAnswer[i]; 
    }
}

function sendTime(flag) {
    var endTime = MyGetTime()

    var data = { BeginTime: startTime, EndTime: endTime, NameOfPage: "verificationRules" }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    //[beginTime, endTime, "ConsentIndex"];
    $.ajax({
        type: "POST",
        url: "/WordSearchAMT/Data/TimeInPage",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            if (flag == 0) {
                moveToNextPage();
            } else {
                moveToErrorTriesPage();
            }
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    });
}

function moveToErrorTriesPage() {
    done = true;
    window.location.replace("/WordSearchAMT/Home/TooManyTries"); //to prevent page back
}

function moveToNextPage() {
    done = true;
    window.location.replace("/WordSearchAMT/Home/PersonalDetails"); //to prevent page back
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