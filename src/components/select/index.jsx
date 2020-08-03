import React, { Component } from 'react'
import './styles.scss'

import Arrow from '../../assets/images/ic-arrow.svg'

export default class Select extends Component {
	state = {
		selected: '',
		isOpen: false,
		errorMessage: '',
		data: []
	}

	componentDidMount() {
		if (this.props.value) {
			this.setSelected(this.props.value)
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			this.setSelected(this.props.value)
		}
	}

	render() {
		return (
			<div
				className="box-select"
				tabIndex="0"
				onBlur={() => this.closeSelect()}>
				<label>{this.props.label}</label>

				<div id={this.props.id}
					className={this.state.isOpen ? 'selected open' : 'selected'}
					onClick={() => this.setState({ isOpen: !this.state.isOpen })}>

					<span className="item-selected" onChange={this.props.onChange}>
						{this.state.selected.name || this.props.placeholder}
					</span>

					<span className="arrow">
						<img src={Arrow} alt="Arrow" />
					</span>

				</div>

				{
					this.state.errorMessage &&
					<p className="msg-error">{this.state.errorMessage}</p>
				}

				<ul id={`select-${this.props.id}`}
					className={(this.state.isOpen) ? 'list-select open' : 'list-select'}>

					{
						this.props.data.length > 0
							? this.props.data.map((item) => {
								return (
									<li key={item.ID}
										id={item.ID}
										className={
											this.state.selected.id === item.ID ?
												'item check' : 'item'
										}
										onClick={() => this.selectItem(item.ID, item.Name)}
									>
										{item.Name}
									</li>
								)
							})
							: <li>Lista vazia</li>
					}

				</ul>

			</div>
		)
	}

	// ============================================
	//                                    Functions
	// ============================================
	closeSelect() {
		this.setState({ isOpen: false })

		this.checkValidate()
	}

	selectItem(id, name) {
		this.props.onSelect(id)

		this.setState({ selected: { id, name } }, () => {
			this.setState({
				isOpen: false,
				errorSpecialities: false
			})
		})

		this.checkValidate()
	}

	checkValidate() {
		if (this.props.validate) {
			this.setState({
				errorMessage: this.props.validate() ?
					'' : this.props.errorMessage
			})
		}
	}

	setSelected(value) {
		this.setState({
			selected: {
				id: value.id,
				name: value.name,
				flag: value.flag
			}
		})
	}
}
