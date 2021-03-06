import React from 'react'
import { render } from 'react-dom'
import App from './containers/App.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin'
import '../css/app.css'

injectTapEventPlugin()

render(<App />, document.getElementById('main'))
