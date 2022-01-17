import React from 'react'
import {hot} from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import store from './core/store'

const App = () => {

    return (
        <Provider store={store}>
            <h1>React App</h1>
        </Provider>
    )
}

export default hot(App)