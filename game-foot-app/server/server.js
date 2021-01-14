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

const scoring = require('./scoring');
const prompts = require('./prompts');

// Contains all of the room codes and server instances
var roomCodes = {};

io.on('connection', (sock) => {
  console.log("someone connected");
  sock.emit('message',"You connected");

  sock.on('disconnecting', () => {
    if(sock.rooms.length>1){ // the Set contains at least the socket ID
      if(roomCodes[sock.rooms[1]].host.id == sock.id){
        io.in(sock.rooms[1]).emit("playerDrop", "host");
        for(var i = 0; i<roomCodes[sock.rooms[1]].players.length; i++){
          roomCodes[sock.rooms[1]].players[i].leave(sock.rooms[1]);
        }
        roomCodes.splice(sock.rooms[1],1);
      }
      else if(roomCodes[sock.rooms[1]].screen = "lobby"){
        io.in(sock.rooms[1]).emit("playerDrop", sock.id);
      }
    }

  });
});

// plebs connecting
io.on('joinLobby', (lobby,username,picture,timeJoin,sock) => {
  if(lobby in roomCodes){ 
    if(blacklistCheck(lobby,username,timeJoin,sock.id)){
      if(roomCodes[lobby].screen == "lobby"){
        sock.join(lobby);
        var newUser = {name:username, id:sock.id, pic:picture, time=timeJoin, points:0};
        roomCodes[lobby].players.push(newUser);
        roomCodes[lobby].playerID.push(sock.id);
        sock.emit('players',roomcodes[lobby].publicplayers);
        sock.to(lobby).emit('userJoin', newUser);
    }
      else{  
        var check = whitelistCheck(lobby,username,timeJoin,sock.id)
        if(check[0]){
          // find screen everyone is on and send them there
          // delete player from disconnects, update sock in players and playerID
          sock.emit('mode', roomCodes[lobby].screen);
          sock.emit('players', roomCodes[code].players);
          roomCodes[lobby].playerID[check[1]] = sock.id;
          sock.join(lobby);
      }
  }}
    // error for game has started without them
    else{
      sock.emit('lobby',1);
    }
  } 
  // error for game lobby not found
  else{
    sock.emit('lobby',0);
  }
});

// reuturn true if player is not in blacklist
function blacklistCheck(lobby,username,timeJoin,sockID){
  for(var i = 0; i < roomCodes[lobby].blacklist.length; i++){
      var blacklistPlayer = roomCodes[lobby].blacklist[i];
      if(blacklistPlayer.id == sockID || (blacklistPlayer.name == username && blacklistPlayer.time == timeJoin)){
        return false;
      }
  }
  return true;
}

// return true if player is in players
function whitelistCheck(lobby,username,timeJoin,sockID){
  for(var i = 0; i < roomCodes[lobby].players.length; i++){
    var disconnectPlayer = roomCodes[lobby].players[i];
    if(disconnectPlayer.name == username && (disconnectPlayer.id == sockID || disconnectPlayer.time == timeJoin)){
      return [true,i];
    }
}
return [false];
}

// Host only
io.on('makeLobby', (username,picture,timeJoin,sock) =>{
  var newCode = lobbyCodeGenerator();
  var hostUser = {name:username, id:sock.id, pic:picture, time=timeJoin, points:0};
  roomCodes[newCode] = {host:hostUser, players:[hostUser], playerID = [sock.id], answers = [], blacklist:[], screen="lobby", gameTime=45, resultsTime=15, mode="group", promptType="default", customPrompts=[], rounds=3 };
  socketio.emit('codeCreated', newCode);
  sock.join(newCode);
});

// run the whole game from here
// Keep in mind: if someone rejoins, their socket id in players will never update
// there will be update in playerID column tho
io.on('startGame', (code) => {
  // emit to everyone game has started
  for(var i = 0; i<roomcodes[codes].rounds * roomcodes[codes].players.length; i++){
    roomCodes[code].mode = "vote";
    roomCodes[code].answers = Array[roomcodes[codes].players.length].fill(0);
    var scoring = "group";
    var honcho;
    io.in(code).emit('mode', 'vote');
    io.in(code).emit('players', roomCodes[code].players);

    if(roomCodes[code].promptType = "default") {
      var aPrompt = promptChoices[Math.floor(Math.random() * promptChoices.length)];
    }

    else if(roomCodes[code].promptType = "custom") {
      var aPrompt = roomCodes[code].customPrompts[Math.floor(Math.random() * roomCodes[code].customPrompts.length)];
    }

    if(roomCodes[code].mode = "mixed") {
      if(i % 2 == 0){
        honcho = Math.floor(Math.random() * roomCodes[code].players.length);
        aPrompt = "What would " + roomcodes[codes].players[honcho].name + "Say: " + aPrompt;
        scoring = "personal";
      }
    } 

    else if(roomCodes[code].mode = "personal") {
      honcho = i%roomcodes[codes].players.length;
      aPrompt = "What would " + roomcodes[codes].players[honcho].name + "Say: " + aPrompt;
      scoring = "personal";
    }

    io.in(code).emit('prompt', aPrompt);
    startTime = Date.now();
    while(Date.now() - startTime < roomcodes[codes].gameTime || ! roomcodes[codes].answers.includes(0)){
      // no idea if volatile works like this
      var timerBoy = setInterval(function(){io.in(code).volatile.emit('timer', Date.now() - startTime); }, 1000);
      var count = 0;
      for(var i = 0; i < array.length; ++i){
          if(array[i] == 0){
              count++;
      }}
      if(count == 1){
        io.in(code).emit('lowerCount',roomcodes[codes].players[roomcodes[codes].answers.find(element => element == 0)]);
      }
    }
    clearInterval(timerBoy);
    

    io.in(code).emit('mode', 'results');
    roomCodes[code].mode = "results";

    while(Date.now() - startTime < roomcodes[codes].resultsTime){
      // add in answer for person who is disconnected
      // scoring.js
      // emit score updates
      scores = scores(roomcodes[codes].answers);
      io.in(code).emit('scores', scores);
    }
    

  }
  io.in(code).emit('mode', 'end');
  roomCodes[code].mode = "endScreen";
});

// Answer is in the form of a list with 3 socket ID's
io.on('answer', (code,sock,answer) => {
  var thisID = roomCodes[code].playerID.find(x => x == sock.id);
  roomCodes[code].answers[thisID] = answer;
  sock.to(code).emit('lowerCount', 1);
});

// make events for end of game
// play again? or home? for host

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
        return result;
    }
  }

// For prompts, enter them one line at a time in a string
var promptChoicesTemp = promptWords;
var promptChoices = promptChoicesTemp.split( "\n" );

