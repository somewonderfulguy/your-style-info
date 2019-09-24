import React from 'react'
import {render} from 'react-dom'

import ApplicationNode from './ApplicationNode'
import {unregister} from './services/serviceWorker'

render(<ApplicationNode />, document.getElementById('root'))

unregister()