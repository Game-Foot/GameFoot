const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

// Not sure if path should be src or App, test
const clientPath = '${__dirname}/../src/App';
console.log('Serving static from ${clientPath}');

app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

// Contains all of the room codes and server instances
roomCodes = {};

io.on('connection', (sock) => {
  console.log("someone connected");
  socketio.emit('message',"You connected");

  socket.on('disconnecting', () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
    
    // If they are in a lobby, remove profile from players
    // If they are in game, move profile from player to disconnect
    // If they are host, move profile and change host by picking next person
    // If there is no one left in lobby, delete it

  });
});

// plebs, 1 is succesful connection and 0 is no lobby found or blacklisted
io.on('joinLobby', (lobby,name,pic,time,sock) => {
  if(lobby in roomCodes){ // && not blacklisted
    roomCodes[lobby].players.push([name,sock.id,pic,time,0]);
    socketio.emit('lobby',1);
  } 
  else{
    socketio.emit('lobby',0);
  }
});

// Host only
io.on('makeLobby', (name,pic,time,sock) =>{
  newCode = lobbyCodeGenerator();
  roomCodes[newCode] = {host:[name,sock.id], players:[[name,sock.id,pic,time,0]], blacklist:[], disconnects: [], inGame=0};
  socketio.emit('codeCreated', newCode);
  sock.join(newCode);
});

server.on('error', (err) =>{
  console.error('Server error:', err)
});

server.listen(8080, () => {
  console.log("Started")
});

  

function lobbyCodeGenerator() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < 4; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
    if(result in roomCodes){
        lobbyCodeGenerator();
    } 
    else{
        // replace with different server instances
        return result;
    }
  }

