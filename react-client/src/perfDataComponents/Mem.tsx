import { useRef } from 'react'
import drawCircle from '../utilities/canvasLoadAnimation'
import React from 'react'

type Data = {
	data: {
		freeMem: number
		totalMem: number
		usedMem: number
		memUsage: number
	}
}

const Mem = ({ data }: Data) => {
	const { freeMem, totalMem, usedMem, memUsage } = data

	const canvasEl = useRef(null)
	drawCircle(canvasEl.current, memUsage * 100)

	const totalMemInGB = Math.floor(((totalMem / 1024 / 1024 / 1024) * 100) / 100)
	const freeMemInGB = Math.floor(((freeMem / 1024 / 1024 / 1024) * 100) / 100)

	return (
		<div className='mem col-3'>
			<h1>Memory Usage</h1>
			<div className='canvas-wrapper'>
				<canvas ref={canvasEl} width='200' height='200'></canvas>
				<div className='mem-text'>{memUsage * 100}%</div>
			</div>
			<div>Total Memory: {totalMemInGB}GB</div>
			<div>Free Memory: {freeMemInGB}GB</div>
		</div>
	)
}

export default Mem
