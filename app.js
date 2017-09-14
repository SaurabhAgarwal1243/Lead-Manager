var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Todos = require('./db').Todos

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//Return list of all todos
app.get('/todos', (req, res) => {
    Todos.findAll().then(function (todos) {
        res.send(todos)
    }).catch(function (err) {
        res.send({error: "Could not retrieve todos"})
    })
})

//Add a new todo
app.post('/todos', (req, res) => {
    console.log(req.body);
    Todos.create({
        task: req.body.task
    }).then(function () {

        res.send({success: true})

    }).catch(function (err) {

    })
})
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
app.listen(3001)