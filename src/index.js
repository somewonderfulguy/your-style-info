import React from 'react'
import {render} from 'react-dom'

import ApplicationNode from './ApplicationNode'
import {unregister} from './services/serviceWorker'
import './common-styles.css'

render(<ApplicationNode />, document.getElementById('root'))

unregister()