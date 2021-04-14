const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

var cors = require('cors')
app.use(cors())

app.use(express.static('views'))

app.get('/:room', (req, res) => {
    res.render('room.ejs', { roomId: req.params.room })
});
var users = [];
io.on('connection', (socket) => {

    var type;

    if (!users.find(i => i.type === "white")) {
        type = "white"
    } else if (!users.find(i => i.type === "black")) {
        type = "black"
    } else {
        type = "viewer"
    }
    users.push({
        socket: socket,
        type: type,
        turn: type === "white" ? true : false,
    })
    io.emit("gameStarted", {
        id: socket.id,
        type: type,
        turn: type === "white" ? true : false,
    })

    socket.on("played", (infos) => {

        io.emit("changesTurn", {
            pleyedID: infos.id,
            white: infos.type === "white" ? false : true,
            black: infos.type === "black" ? false : true,
            info: infos
        })
    })

    socket.on('disconnect', () => {
        var i = users.findIndex((i) => i.socket === socket);
        if (users[i].type !="viewer"){
            io.emit("disconnectSocket",{
                type:users[i].type
            })
        }
        users.splice(i, 1);
        
    });

});


server.listen(3000, () => {
    console.log('listening on *:3000');
});