import io from 'socket.io-client'

const socket = io.connect('http://192.168.1.191:3000')
socket.on('welcome', data => {
	console.log(data)
})
