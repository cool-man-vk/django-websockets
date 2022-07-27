const http = require('http') 

const server = http.createServer()

const socketio = require('socket.io') 

// sio = socketio.Server(cors_allowed_origins="http://127.0.0.1:8000")
const io = socketio(server , {
   cors: {
      origin:'http://127.0.0.1:8000',
      methods : [ 'GET','POST']
   }
  
})

const room = 'testRoom'

io.on('connection' , socket => {
   console.log('connected')
   console.log(socket.id)

   socket.join(room)
//    io.to(room).emit('Welcome','A New user entered the Chat')
   socket.broadcast.emit('Welcome2' , 'A New user entered the chat !!')

   socket.on('message', msg => {
    console.log(msg)
    io.to(room).emit('messageToClients',msg)
  })

  socket.on('disconnect', () => { 
     io.to(room).emit('byebye','User has left the chat')

  })
})

server.listen(8000 , () => {
  return console.log('Listening on port 8000')
})