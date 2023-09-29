// Socket.io server that will service both node
// and react clients
//Req:
// - socket.io
// - @socket.io/cluster-adapter
// - @socket.io/sticky

// entrypoint for our cluster that will make workers
// and the workers will do the Socket.io handling
// See https://github.com/elad/node-cluster-socket.io

import cluster from 'cluster'
import http from 'http'
import { Server } from 'socket.io'
import os from 'os'
import { setupMaster, setupWorker } from '@socket.io/sticky'
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter'
import socketMain from './socketMain.js'
import { instrument } from '@socket.io/admin-ui'

const numCPUs = os.cpus().length

if (cluster.isPrimary) {
	console.log(`Master ${process.pid} is running`)

	const httpServer = http.createServer()

	// setup sticky sessions
	setupMaster(httpServer, {
		loadBalancingMethod: 'least-connection',
	})

	// setup connections between the workers
	setupPrimary()

	// needed for packets containing buffers (you can ignore it if you only send plaintext objects)
	// Node.js < 16.0.0
	cluster.setupPrimary({
		serialization: 'advanced',
	})
	// Node.js > 16.0.0
	// cluster.setupPrimary({
	//   serialization: "advanced",
	// });

	httpServer.listen(3000, '192.168.1.191')

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}

	cluster.on('exit', worker => {
		console.log(`Worker ${worker.process.pid} died`)
		cluster.fork()
	})
} else {
	console.log(`Worker ${process.pid} started`)

	const httpServer = http.createServer()
	const io = new Server(httpServer, {
		cors: {
			origin: ['http://192.168.1.191:5173', 'http://192.168.1.191:3030'],
			credentials: true,
		},
	})

	// instrument(io, {
	// 	auth: false,
	// 	mode: 'development',
	// })

	// use the cluster adapter
	io.adapter(createAdapter())

	// setup connection with the primary process
	setupWorker(io)

	socketMain(io)
}
