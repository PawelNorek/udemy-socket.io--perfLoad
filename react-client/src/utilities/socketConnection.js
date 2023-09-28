import io from 'socket.io-client'

const options = {
	auth: {
		token: '21341234132r12335rqwr13254fewq5',
	},
}

const socket = io.connect('http://192.168.1.191:3000', options)
socket.on('connect', data => {
	console.log(data)
})

export default socket
