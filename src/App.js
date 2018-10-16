import React, { Component } from 'react'
import TextTyper from './components/TextTyper'
class App extends Component {
	render() {
		return (
			<div className="App">
				<TextTyper text={'Some random text'.split('')} />
			</div>
		)
	}
}

export default App
