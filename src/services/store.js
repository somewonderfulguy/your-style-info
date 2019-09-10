import {configureStore, getDefaultMiddleware} from 'redux-starter-kit'

import {
  pageSlice
} from '../slices'

const reducer = {
  pageSlice: pageSlice.reducer
}

const middleware = [...getDefaultMiddleware()]

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware
})

export default store