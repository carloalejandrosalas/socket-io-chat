var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
	{
		id: 1,
		text: "Hola soy un mensaje",
		author: "Carlo Salas"
	}
];

app.use(express.static("public"));

app.get("/", function(req, resp){
	resp.status(200).send("Hello world");
});

io.on('connection', function(socket){
	console.log("Alguien se ha conectado con socket");
	socket.emit("messages", messages);

	socket.on("new-message", function(data){
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});


server.listen(8080, function(){
	console.log("Servidor corriendo en http://locahost:8080");
});