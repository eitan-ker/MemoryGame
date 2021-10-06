

function login() {
    var uname = document.getElementById("userName").value
    var pass = document.getElementById("password").value

    var data = {Name: uname, Password: pass }
    var stringTosend = JSON.stringify(data);
    console.log(stringTosend);
    $.ajax({
        type: "POST",
        url: "/MemoryGame/Admin/CheckPassword",
        data: stringTosend,
        contentType: "application/json",
        success: function (data) {
            alert("good");
        },
        error: function (errMsg) {
            alert("errMsg");
        }
    });
    console.log(uname);
    console.log(pass);

}

//REPLY OF SPECIFIC USER
workerid = "436"
assid = "1"
hitid = "123"
var data = {WorkerId: workerid, AssId: assid, HitId: hitid}
var stringTosend = JSON.stringify(data);
console.log(stringTosend);
$.ajax({
    type: "POST",
    url: "/MemoryGame/Admin/GetAllUserDataFromDB",
    data: stringTosend,
    contentType: "application/json",
    success: function (data) {
        alert("good");
    },
    error: function (errMsg) {
        alert("errMsg");
    }
});


// A LIST OF ALL USERS
$.ajax({
    type: "GET",
    url: "/MemoryGame/Admin/GetAllUsersFromDB",
    contentType: "application/json",
    success: function (data) {
        alert("good");
    },
    error: function (errMsg) {
        alert("errMsg");
    }
});