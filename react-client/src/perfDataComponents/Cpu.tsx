import { useRef } from 'react'
import drawCircle from '../utilities/canvasLoadAnimation'
import React from 'react'

type Data = {
	data: {
		cpuLoad: number
	}
}

const Cpu = ({ data }) => {
	const canvasEl = useRef(null)
	drawCircle(canvasEl.current, data.cpuLoad)

	return (
		<div className='cpu col-3'>
			<h1>CPU Load</h1>
			<div className='canvas-wrapper'>
				<canvas ref={canvasEl} width='200' height='200'></canvas>
				<div className='cpu-text'>{data.cpuLoad}</div>
			</div>
		</div>
	)
}

export default Cpu
