var url  = require('url'),
    sys  = require('sys'),
    express = require('express'),
    http=require('http');
    path = require('path')

var bodyParser = require('body-parser');
var mysql = require('mysql');
var flash = require('express-flash');

var con = mysql.createConnection({
  host: "localhost",
  database: "activeconnect",
  user: "root",
  password: ""
});

var app = express();
var server = http.createServer(app);
// var socket = io.listen(server);

app.engine('.html', require('ejs').__express);
app.set('Views', __dirname + '/Views');
app.use(express.static(path.join(__dirname, 'Assets')));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('Index');
});
app.get('/Events.html', function(req, res){
    res.render('Events');
});
app.get('/Games.html', function(req, res){
    res.render('Games');
});

app.get('/Profile.html', function(req, res){
    res.render('Profile');
});
app.get('/test.html', function(req, res){
    res.render('test');
});
app.get('/CreateProfile.html', function(req, res){
    res.render('CreateProfile');
});
app.get('/Bingo.html', function(req, res){
    res.render('Bingo');
});
app.get('/LogIn.html', function(req, res){
    res.render('LogIn');
});
app.get('/get-events-by-month', function(req, res) {
    console.log(req.query.data);
    var temp = req.query.data.split('-'), p1 = temp[0], p2 = temp[1];
    console.log(p1);
    console.log(p2);
    con.query('SELECT * FROM event WHERE month = ' + p1 + ' AND year = ' + p2 + ';', function(err, rows) {
    console.log(rows);
    if (err) {
        res.json({
            msg: 'error'
        });
    } else {
        res.json({
            msg: 'success',
            event: rows
        });
    }
    });
});

app.get('/get-events-by-day', function(req, res) {
    console.log(req.query.data);
    var temp = req.query.data.split('-'), p1 = temp[0], p2 = temp[1], p3 = temp[2];
    console.log(p1);
    console.log(p2);
    console.log(p3);
    con.query('SELECT * FROM event WHERE day = ' + p1 + ' AND month = ' + p2 + ' AND year = '+ p3 +';', function(err, rows) {
    console.log(rows);
    if (err) {
        res.json({
            msg: 'error'
        });
    } else {
        res.json({
            msg: 'success',
            event: rows
        });
    }
    });
});

app.get('/get-events-by-email', function(req, res) {
    console.log(req.query.data);
    con.query("SELECT event.EventID, event.Title, event.Day, event.Month, event.Year FROM users_to_events JOIN event ON event.EventID = users_to_events.EventID WHERE email LIKE '" + req.query.data + "' ;", function(err, rows) {
    console.log(rows);
    if (err) {
        res.json({
            msg: 'error'
        });
    } else {
        res.json({
            msg: 'success',
            event: rows
        });
    }
    });
});

app.post('/add-event-to-user', function(req, res, next) {
    console.log(req.query.data);
    var temp = req.query.data.split('-'), p1 = temp[0], p2 = temp[1];
    console.log(p1);
    console.log(p2);
    con.query("SELECT COUNT(*) AS insertCheck FROM users_to_events WHERE Email = '"+ p1 +"' AND EventID = "+ p2 +";", function(err, result) {
        console.log("POOPOE" + result[0].insertCheck);
        if (err) throw err;
        
        if (result[0].insertCheck > 0) {
            res.end("You have already joined this event.");
        } else {
            con.query("INSERT INTO users_to_events (Email, EventID) VALUES ('" + p1 + "', '" + p2 + "');", function(err, rows) {
                console.log(rows);
                if (err) throw err;
                
            });
        }

    });


    
});

app.post('/remove-event-from-user', function(req, res, next) {
    console.log(req.query.data);
    var temp = req.query.data.split('-'), p1 = temp[0], p2 = temp[1];
    console.log(p1);
    console.log(p2);
        
    con.query("DELETE FROM `users_to_events` WHERE Email LIKE '" + p1 + "' AND EventID = "+ p2 +";", function(err, rows) {
        console.log(rows);
        if (err) throw err;
        
    });
        
});

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
   
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/Bingo.html', function(req, res){
    res.render('Bingo');
});
app.get('/CreateProfile.html', function(req, res){
    res.render('CreateProfile');
});
app.listen(8000);

// sys.puts('server running ' + 'now ' + Date.now());

