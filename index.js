const express = require('express');
const server = require('./server');

server.listen(4000, () => {
    console.log('Server is running')
})