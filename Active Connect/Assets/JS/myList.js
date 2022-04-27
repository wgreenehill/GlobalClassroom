function myList(){
    getEventsByEmail('Jackiemo@gmail.com', displayList);
}

function displayList(results){

    var listBody = "<h2>Your upcoming Events</h2><div id = list>";
    if(results.length > 0){
        listBody += "<ul>";
        for(const event of results){
            listBody += "<li><h2>" + event.Title + ": " + event.Day + "/" + event.Month + "/" + event.Year + " <button id = 'deleteButton' class = 'dButton' value = '"+ event.EventID +"'>X</button>" + "</h2></li>" ;
        }
        listBody += "</ul>";
    } else{
        listBody += "<h4>No Events Joined</h4>"
    }
    listBody += "</div><h3> Today's date is </h3><div id = caldate></div>";

    document.getElementById("calbox").innerHTML=listBody;
    document.getElementById("deleteButton").addEventListener("click", function() {
        var value = document.getElementById("deleteButton").value;
        removeEventFromUser('Jackiemo@gmail.com', value);
    }, false);
    
}

function getEventsByEmail(p1, callback) {
    var array = new Array();
    $.ajax({
        url: "http://localhost:8000/get-events-by-email?data=" +p1,
        type: "GET",
        dataType: 'json',
        "dataSrc": "tableData",
        success: function(result) {
            $.each(result.event, function(key, value) {
                console.log(value);
                console.log(value.Day);
                array.push(value);
            });
            callback(array);
        }
    });
   
}

function  removeEventFromUser(p1, p2) {
    $.ajax({
        url: "http://localhost:8000/remove-event-from-user?data=" + p1 + "-" + p2,
        type: "POST",
        dataType: 'json',
        "dataSrc": "tableData",
        success: function(result) {
        }

    });
    location.reload();
}
