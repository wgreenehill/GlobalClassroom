var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  database: "activeconnect",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function getEventsByMonth(m, y){

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM event WHERE month = " + m + "  AND year = " + y, 
            function(err, results, fields){
                if(err) throw err;
                console.log(results);
        });
        console.log("Connected!");
      });
}

function getEventsByDay(d, m, y){

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM event WHERE day = " + d + " month = " + m + "  AND year = " + y, 
            function(err, results, fields){
                if(err) throw err;
                console.log(results);
        }); 
        console.log("Connected!");
      });
}

function getEventsByUser(user_email){

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users_to_events WHERE email LIKE '"+ user_email +"' JOIN event ON event.id = users_to_events.id",
            function(err, results, fields){
                if(err) throw err;
                console.log(results);
        }); 
        console.log("Connected!");
      });
}