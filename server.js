const express = require('express');
const cors = require('cors')
const server = express();
const postsRouter = require('./posts/postRouter');

server.use(express.json());
server.use(cors())
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`
        <h2>Your Server is working :)</h2>
    `)
})

module.exports = server;