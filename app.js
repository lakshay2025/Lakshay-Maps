const express = require("express");
const app = express();
const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);


const path = require("path");


const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receiver-location", { id: socket.id, ...data });
    })
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
})

io.on("connection", function (socket) {
    console.log("connected");
});

const PORT = 4000;

app.get('/', (req, res) => {
    res.render('index'); // Render 'index.ejs' from the 'views' directory
});

server.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
