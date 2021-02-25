const express = require("express");
const socket = require("socket.io");
//App setup
const app = express();
const server = app.listen(3000, () => {
  console.log("Listening to port 3000");
});

//Static files
app.use(express.static("public"));

//Socket setup on server
const io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
