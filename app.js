/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http'),
  favicon = require('express-favicon'),
  path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Middleware params


//DB

var pg = require('pg');

var reader = require('./routes/reader');
var blog = require('./routes/blog');
var pitch = require('./routes/pitch');
var library = require('./routes/library')


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/blog', blog.blog);
app.get('/ten-minute-pitch', pitch.pitch);
app.get('/library', library.library);
app.get('/library/authors/:alpha/', library.browse_authors);
app.get('/library/titles/:alpha', library.browse_titles);
app.get('/library/search/:query', library.search);
app.get('/library/search//', library.library);
app.get('/library/:page', library.library);
app.get('/library/authors/:alpha/:page', library.browse_authors);
app.get('/library/titles/:alpha/:page', library.browse_titles);
app.get('/library/search/:query/:page', library.search);
app.get('/reader/:bookid/:pageid', reader.reader)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
