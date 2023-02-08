const express = require('express');
const path = require('path');
const { sendMessage } = require('./controllers/socket');
require('./models/server').dbConnection();
const Arrowchat = require('./models/arrowchat');
require('dotenv').config();

// DB Config

// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis Rutas
// app.use( '/api/login', require('./routes/auth') );
// app.use( '/api/usuarios', require('./routes/usuarios') );
app.use('/api/mensajes', require('./routes/mensajes'));

// var payload = {
//     // id: 
//     from: 1,
//     to: 2,
//     message: 'hola Marlon',
//     sent: 1663166129,
//     read: 0,
//     user_read: 1,
//     direction: 1,
//     priority_message_id: null,
//     type: 'text',
//     url: null,
//     size: null,
//     filename: null
// };

// sendMessage(payload);
// sendMessage

// getMessages(payload);

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});