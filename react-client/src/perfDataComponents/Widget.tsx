import Cpu from './Cpu'
import Info from './Info'
import Mem from './Mem'
import './Widget.css'
import React, { useEffect } from 'react'
import socket from '../utilities/socketConnection'
import { useState } from 'react'

type Data = {
	data: {
		freeMem: number
		totalMem: number
		usedMem: number
		memUsage: number
		osType: string
		upTime: number
		cpuType: string
		numCores: number
		cpuSpeed: number
		cpuLoad: number
		macA: string
	}
}

const Widget = ({ data }: Data) => {
	const [isAlive, setIsAlive] = useState(true)

	const { freeMem, totalMem, usedMem, memUsage, osType, upTime, cpuType, numCores, cpuSpeed, cpuLoad, macA } = data

	const cpuData = { cpuLoad }
	const memData = { freeMem, totalMem, usedMem, memUsage }
	const infoData = { macA, osType, upTime, cpuType, cpuSpeed, numCores }

	const notAliveDiv = !isAlive ? <div className='not-active'>Offline</div> : <></>

	useEffect(() => {
		socket.on('connectedOrNot', ({ machineMacA, isAlive }) => {
			if (machineMacA === macA) {
				setIsAlive(isAlive)
			}
		})
	}, [])

	return (
		<div className='widget row justify-content-evenly'>
			{notAliveDiv}
			<Cpu data={cpuData} />
			<Mem data={memData} />
			<Info data={infoData} />
		</div>
	)
}

export default Widget
