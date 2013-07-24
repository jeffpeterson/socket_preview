var
  app         = require('http').createServer(handler),
  io          = require('socket.io').listen(app),
  fs          = require('fs'),
  current_url = '';

app.listen(4567);

function handler (req, res) {
  if (req.url === "/") req.url = "/index.html";
  fs.readFile(__dirname + req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  console.log("Connected");
  socket.emit('navigate', { url: current_url });
  socket.on('navigate', function(data){
    current_url = data.url;
    console.log(current_url);

    io.sockets.emit('navigate', data);
  });
});
