import Cpu from './Cpu'
import Info from './Info'
import Mem from './Mem'

const Widget = () => {
	return (
		<>
			<h1>Widgets</h1>
			<Cpu />
			<Mem />
			<Info />
		</>
	)
}

export default Widget
