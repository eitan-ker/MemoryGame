

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
            window.location.replace("/MemoryGame/Admin/ChooseDataOrReplay");
        },
        error: function (errMsg) {
            alert("errMsg");
        }
    });

}
