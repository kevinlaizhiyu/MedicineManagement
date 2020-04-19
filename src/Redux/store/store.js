import {createStore} from 'redux'
import reducer from './reducer'

let Store = new createStore(reducer)

export default Store