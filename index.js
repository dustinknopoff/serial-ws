import SerialPort from "serialport"
const Readline = require('@serialport/parser-readline')
import WebSocket from "ws"
const server = new WebSocket.Server({ port: 8080 });
const port = new SerialPort('insert your serial /dev/...', {
    baudRate: 9600
})

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)

// Switches the port into "flowing mode"
//port.on('data', function (data) {
//console.log('Data:', data.toString())
//})

// Pipe the data into another stream (like a parser or standard out)
//const lineStream = port.pipe(new Readline())

// Open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message)
})

let sockets = [];
server.on('connection', function(socket) {
    sockets.push(socket);
    // Read data that is available but keep the stream in "paused mode"
    parser.on('data', function(data) {
        sockets.forEach(s => s.send(data))
    })
    // When you receive a message, send that message to every socket.
    socket.on('message', function(msg) {
        sockets.forEach(s => s.send(msg));
    });

    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', function() {
        sockets = sockets.filter(s => s !== socket);
    });
});
