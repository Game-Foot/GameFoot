const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = '${__dirname}/../src';
console.log('Serving static from ${clientPath}');

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
  console.log("someone connected");
  socketio.emit('message','Hi, connected');
});

server.on('error', (err) =>{
  console.error('Server error:', err)
});

server.listen(8080, () => {
  console.log("Started")
});

// Contains all of the room codes and server instances
roomCodes = {};
// import this somewehere idk
// import {isMobile} from 'react-device-detect';


class user {
  constructor(name, pic, roomCode) {
    this.name = name;
    this.pic = pic;
    this.roomCode = roomCode;
    this.isHost = 0;
    this.mobile = isMobile;
  }
}

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
        roomCodes[result] = Math.random();
        return result;
    }
  }

