require ('dotenv').config();

const Server = require('./data/server');

const server = new Server();

server.listen();
