
$(function () {
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
});






function Submit() {
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