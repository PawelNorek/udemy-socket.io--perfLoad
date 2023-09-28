import { useEffect, useState } from 'react'
import './App.css'
import socket from './utilities/socketConnection'
import Widget from './perfDataComponents/Widget'

function App() {
	const [performanceData, setPerformanceData] = useState({})

	useEffect(() => {
		//socket was created on load of the component
		//add listener to that socket
		socket.on('perfData', data => {
			// console.log(data)

			//copy performanceData so we can mutate it
			const copyPerfData = { ...performanceData }
			//performanceData is an object
			//this is because we do not know which machine just sent data
			//so we use macA as identifier
			//every tick data goes through just overwrite this value
			copyPerfData[data.macA] = data
			setPerformanceData(copyPerfData)
		})
	}, [])

	const widgets = Object.values(performanceData).map(d => <Widget data={d} key={d.macA} />)

	return <div className='container'>{widgets}</div>
}

export default App
