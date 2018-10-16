import P from 'prop-types'
import styled from 'styled-components'

import { status } from './constants'

const match = (key, matchers) => props => matchers[props[key]]

const Character = styled.span`
	background-color: ${match('status', {
		[status.NOT_TYPED]: 'white',
		[status.CORRECT]: 'green',
		[status.ERROR]: 'red'
	})};
	transition: all 0.1s ease-in-out;
`

Character.propTypes = {
	status: P.oneOf(Object.keys(status))
}
export default Character
