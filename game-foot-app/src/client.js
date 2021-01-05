
/*
const writeEvent = (text) => {
    // events <ul> does not exist yet
    const parent = document.querySelector('#events')

    // <li> does not exist yet
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

writeEvent('Welcome');

const sock = io();
sock.on('message', writeEvent);

*/

var man ={
    kids:{son:"sam",daughter:"kiera"},

};
var wives ={
    hot:"Seela",
    cold:"deborah",
};
dish = 4;
console.log(man.kids.son);
man.wife = wives;
console.log(man.wife.hot);
man.wife.hot = "cassandra";
console.log(man.wife.hot);
man[dish] = 5;
console.log(man[4]);

lobby = [[3]];
lobby.push([4]);
console.log(lobby[0][0],lobby[1][0]);

lobby = 5;
roomCodes = {};
roomCodes[lobby] = {players:[['jim','bob']]};

roomCodes[lobby].players.push(['gumbo']);

console.log(roomCodes[lobby].players[1][0]);

//console.log(man[kids[son]]);