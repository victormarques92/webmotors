import React, { Component } from 'react'
import { BounceLoader } from 'react-spinners'
import './styles.scss'

export default class Loading extends Component {
	render() {
		return <div className="loading">
			<BounceLoader
				size={60}
				color="#f3123c"
			/>
		</div>
	}
}
