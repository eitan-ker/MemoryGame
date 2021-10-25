
$(function () {
    $.ajax({
        type: "GET",
        url: "/MemoryGame/Data/ClientFinishedGame",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $.ajax({
                type: "GET",
                url: "/MemoryGame/Data/ClientIsDone",
                // The key needs to match your method's input parameter (case-sensitive).
                success: function (data) {
                },
                error: function (errMsg) {
                    alert("done");
                }
            });
        },
        error: function (errMsg) {
            alert("finished");
        }
    });
    
});


