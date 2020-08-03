import React, { Component } from 'react'
import './styles.scss'

export default class Card extends Component {
	render() {
		return (
			<div className="card">
				<img className="image" src={this.props.image} alt="Veículo" />

				<div className="content">

					<div className="content-top">
						<p className="title">
							{this.props.make} {this.props.model}
						</p>
						<p className="descriptions">
							{this.props.version}
						</p>
					</div>

					<div className="content-bottom">
						<p className="price">
							R$ {this.props.price}
						</p>

						<div className="year-km">
							<p className="year">
								{this.props.yearModel}/{this.props.yearFab}
							</p>
							<p className="km">
								{this.props.km} km
							</p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
