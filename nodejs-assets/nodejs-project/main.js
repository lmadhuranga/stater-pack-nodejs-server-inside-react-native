let rn_bridge=undefined; 
const {
  calert,
  localIp,
  platform,
  clog,
  init,
  isMobile,
  cpost
} = require('./helpers/utiles');

// Check platform is mobile load the libries for mobile
if(isMobile){
  rn_bridge = require('rn-bridge');
  init(rn_bridge);
  registerListners();
  eventListnersRegister();
}

// Register mobile listners
function registerListners() {
  rn_bridge.app.on('pause', (pauseLock) => {
    pauseLock.release();
  });
  rn_bridge.app.on('resume', () => {
    console.log('[node] app resumed.');
  });
  rn_bridge.app.on('messege', () => {
    console.log(`[node] msg ${msg}`);
  });
}

// Rister Mobile events
function eventListnersRegister() {
  // Event Register
  rn_bridge.channel.on('myEvent', (msg) => {
    console.log('myEvent msg ->', msg);
  });
}

// socket io
var app = require('http').createServer(),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(3000, function() {
  console.log('Socket IO Server is listening on port 3000');
});

io.sockets.on('connection', function(socket) {
  console.log('connection...');
  socket.on('emit_from_client', function(data) {
    console.log('socket.io server received : '+data);
    io.sockets.emit('emit_from_server', data);
  });
});

// TCP server
var net = require('net');
var writable = require('fs').createWriteStream('test.txt');

net.createServer(function (socket) {
  console.log('socket connected');
  socket.on('data', function(data) {
    var line = data.toString();
    console.log('got "data"', line);
    socket.pipe(writable);
    io.sockets.emit('emit_from_server', line); 
  });
  socket.on('end', function() {
    console.log('end');
  });
  socket.on('close', function() {
    console.log('close');
  });
  socket.on('error', function(e) {
    console.log('error ', e);
  });
  socket.write('hello from tcp server');
}).listen(3080, function() {
  console.log('TCP Server is listening on port 3080');
});