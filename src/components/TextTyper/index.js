import React, { Component } from 'react'
import P from 'prop-types'

import { status, keys } from './constants'
import wpm from './wpm'
import Character from './Character'

class TextTyper extends Component {
	state = {
		start: null,
		end: null,
		index: 0,
		indexStatus: status.NOT_TYPED
	}

	getCharacterStatus = i => {
		const { index, indexStatus } = this.state
		return i === index
			? indexStatus
			: i > index
				? status.NOT_TYPED
				: status.CORRECT
	}

	handleBackSpace = () =>
		this.setState(s => ({
			index:
				s.index === 0
					? 0
					: s.indexStatus === status.ERROR
						? s.index
						: s.index - 1,
			indexStatus: status.NOT_TYPED
		}))

	markTimeOf = endOrStart =>
		this.setState(s => ({
			[endOrStart]: Date.now()
		}))

	handleStartOrEnd = () =>
		this.state.index === 0
			? this.markTimeOf('start')
			: this.state.index === this.props.text.length - 1
				? this.markTimeOf('end')
				: undefined

	handleError = () =>
		this.setState(s => ({
			indexStatus: status.ERROR
		}))

	handleCorrect = () =>
		this.setState(s => ({
			index: s.index + 1,
			indexStatus: status.NOT_TYPED
		}))

	handleKeyDown = e =>
		[keys.CapsLock, keys.Shift].includes(e.key)
			? undefined
			: e.key === keys.Backspace
				? this.handleBackSpace()
				: e.key !== this.props.text[this.state.index]
					? (this.handleStartOrEnd(), this.handleError())
					: (this.handleStartOrEnd(), this.handleCorrect())

	render() {
		const { text } = this.props
		const { start, end } = this.state
		return (
			<p tabIndex="0" onKeyDown={this.handleKeyDown}>
				{text.map((character, i) => (
					<Character key={character + i} status={this.getCharacterStatus(i)}>
						{character}
					</Character>
				))}
				<ul>
					<li>Start : {start}</li>
					<li>End : {end}</li>
					<li>WPM : {wpm(text.length, start, end)}</li>
				</ul>
			</p>
		)
	}
}

TextTyper.propTypes = {
	text: P.arrayOf(P.string.isRequired).isRequired
}

export default TextTyper
