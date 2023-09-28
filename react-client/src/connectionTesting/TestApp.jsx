import { useEffect } from 'react'
import socket from '../socketConnection'

const TestApp = () => {
	useEffect(() => {
		socket.emit('testConnection', 'Am I connected?')
	}, [])

	return <h1>Test App</h1>
}

export default TestApp
