import React, { Component } from 'react'
import './styles.scss'
import Logo from '../../assets/images/webmotors.svg'


export default class Navigation extends Component {

	render() {
		return (
			<nav className="nav">
				<a href="/">
					<img src={Logo} alt="Jussi"/>
				</a>
			</nav>
		)
	}

}
