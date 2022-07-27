
const socket = io('http://localhost:8000')

const alertBox = document.getElementById('alert-box') 
const messagesBox = document.getElementById('messages-box') 
const messageInput = document.getElementById('message-input')
const sendBtn = document.getElementById('send-btn') 


// socket.on('Welcome',msg => {
//   console.log(msg)
// })

const handleAlerts = (msg,type) => {
  alertBox.innerHtml=`
    <div class="alert alert-${type}" role="alert">
      ${msg}
    </div>
  `

  setTimeout(() => {
    alertBox.innerHtml = ""
  }, 2000)
}

socket.on('Welcome2',msg => {
    console.log(msg)

    handleAlerts(msg , 'primary')
})

socket.on('byebye',msg => {
    console.log(msg)

    handleAlerts(msg , 'danger')
})

sendBtn.addEventListener('click',() => {
  const message = messageInput.value;
  messageInput.value = ''
  console.log(message);

  socket.emit('message',message)
})

socket.on('messageToClients',msg => {
  console.log(msg)

  messagesBox.innerHTML += `
    <b>${msg} </b> <br/>
  `
})