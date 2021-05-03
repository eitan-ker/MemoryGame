const datademo = [{ id: "1", score: "14", info: "bla", time_in_pages: "150" }, { id: "2", score: "15", info: "bla2", time_in_pages: "250"}];

const order = ["id", "score", "info","time_in_pages"];

$(function loadData() {
    makeTable(datademo);
});

function makeTable(data) {
    var array = [];
    var tablearea = document.getElementById('tabledata');
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    console.log(order.length);
    for (var i = 0; i < order.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = order[i];
        th.setAttribute("id", order[i]);
        tr.appendChild(th);
    }
    table.appendChild(tr);
    for (var i = 0; i < data.length; i++) {
        array[i] = document.createElement('tr');
        for (var j = 0; j < Object.keys(data[i]).length; j++) {
            var td1 = document.createElement('td');
            td1.setAttribute("headers", Object.keys(data[i])[j]);
            var text1= document.createTextNode(data[i][order[j]]);
            td1.appendChild(text1);
            console.log(td1);
            array[i].appendChild(td1);
        }
        table.appendChild(array[i]);
    }
    console.log(table);
    tablearea.appendChild(table);
    console.log(array);
    
}