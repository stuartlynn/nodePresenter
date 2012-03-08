
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes


app.listen(3000);

var sockets =[]

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {

  sockets.push(socket);

  socket.on('next', function (data) {
    for(var i in sockets){
      sockets[i].emit('next');
    }
  });

   socket.on('prev', function (data) {
    for(var i in sockets){
      sockets[i].emit('prev');
    }
  });

});
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
