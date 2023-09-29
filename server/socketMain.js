const socketMain = io => {
	io.on('connection', socket => {
		let machineMacA
		const auth = socket.handshake.auth

		if (auth.token === '3129rwdfk0q9i3u409qir012fpwqf230') {
			socket.join('nodeClient')
		} else if (auth.token === '21341234132r12335rqwr13254fewq5') {
			socket.join('reactClient')
		} else {
			socket.disconnect()
			console.log('YOU HAVE BEEN DISCONNECTED!!!')
		}
		console.log(`Someone connected on worker ${process.pid}`)
		socket.emit('welcome', 'Welcome to our server')

		socket.on('perfDataClient', data => {
			console.log(data.macA)
			if (!machineMacA) {
				machineMacA = data.macA
				io.to('reactClient').emit('connectedOrNot', { machineMacA, isAlive: true })
			}
			io.to('reactClient').emit('perfData', data)
		})

		socket.on('testConnection', data => {
			console.log(data)
		})

		socket.on('disconnect', reason => {
			//a nodeClient just disconnected. Let the front end know!
			io.to('reactClient').emit('connectedOrNot', { machineMacA, isAlive: false })
		})
	})
}

export default socketMain
