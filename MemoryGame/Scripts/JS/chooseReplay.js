// A LIST OF ALL USERS
console.log("all users");
$.ajax({
    type: "GET",
    url: "/MemoryGame/Admin//GetAllUsers",
    contentType: "application/json",
    success: function (data) {
        alert("good");
        DataTable(data);
    },
    error: function (errMsg) {
        alert("errMsg");
    }
});

function dataTable(data) {
    console.log("hii table");
}


/*

//REPLY OF SPECIFIC USER
console.log("spcific user");
workerid = "436"
assid = "1"
hitid = "123"
var data = {WorkerId: workerid, AssId: assid, HitId: hitid}
var stringTosend = JSON.stringify(data);
console.log(stringTosend);
$.ajax({
    type: "POST",
    url: "/MemoryGame/Admin/GetReplyOfUser",
    data: stringTosend,
    contentType: "application/json",
    success: function (data) {
        alert("good");
    },
    error: function (errMsg) {
        alert("errMsg");
    }
});

 * /