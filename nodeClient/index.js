// The node program that captures local performance data
// and sends it via socket to the server
//Req:
// - socket.io-client

import os from 'os'

function cpuAverage() {
	const cpus = os.cpus()
	//cpus is an array of all cores. We need the average of all the cores which will give as a cpu average.
	let idleMs = 0 //idle milliseconds
	let totalMs = 0 //total milliseconds
	cpus.forEach(aCore => {
		for (let mode in aCore.times) {
			totalMs += aCore.times[mode]
		}
		idleMs += aCore.times.idle
	})
	return {
		idle: idleMs / cpus.length,
		total: totalMs / cpus.length,
	}
}

const getCpuLoad = () =>
	new Promise((resolve, reject) => {
		const start = cpuAverage()
		setTimeout(() => {
			const end = cpuAverage()
			const idleDiff = end.idle - start.idle
			const totalDiff = end.total - start.total
			// console.log(idleDiff, totalDiff)
			const percentOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff)
			resolve(percentOfCpu)
		}, 100)
	})

const performanceLoadData = () =>
	new Promise(async (resolve, reject) => {
		const cpus = os.cpus()

		const osType = os.type()

		const upTime = os.uptime()

		const totalMem = os.totalmem()

		const freeMem = os.freemem()

		const usedMem = totalMem - freeMem
		const memUsage = Math.floor((usedMem / totalMem) * 100) / 100

		const cpuType = cpus[0].model
		const numCores = cpus.length
		const cpuSpeed = cpus[0].speed

		const cpuLoad = await getCpuLoad()

		resolve({
			freeMem,
			totalMem,
			usedMem,
			memUsage,
			osType,
			upTime,
			cpuType,
			numCores,
			cpuSpeed,
			cpuLoad,
		})
	})

const run = async () => {
	const data = await performanceLoadData()
	console.log(data)
}

run()
