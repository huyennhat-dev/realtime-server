const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Server is running to port ${PORT}`)
})

const io = require('socket.io')(server)

const connectedUser = new Set()

io.on('connection', (socket) => {
    console.log(`Connection successfully ${socket.id}`)
    connectedUser.add(socket.id)
    io.emit('connect-user', connectedUser.size)

    socket.on('disconnect', () => {
        console.log(`Disconnected ${socket.id}`)
        connectedUser.delete(socket.id)
        io.emit('connect-user', connectedUser.size)


    })

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('message-receive', data)
    })
})