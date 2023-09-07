import { Server } from "socket.io";

import Connection from "./database/db.js";

Connection()

const port = process.env.PORT || 9000

const io = new Server(port, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {

    socket.on('get-document', documentId => {

        const data = ""
        socket.join(documentId)
        socket.emit('load-document', data)

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)

        })

    })


})
