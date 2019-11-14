import {createSlice} from 'redux-starter-kit'

import {getPageData} from '../api'

const initialState = {
  header: '',
  components: []
}

const pageSlice = createSlice({
  initialState,
  reducers: {
    setHeader: (state, action) => ({...state, header: action.payload}),
    setComponents: (state, action) => ({...state, components: action.payload})
  }
})

pageSlice.effects = {
  fetchPageData: path => (
    async dispatch => {
      const response = await getPageData(path)
      const json = await response.json()

      const {setHeader, setComponents} = pageSlice.actions
      const {header, components} = json
      
      dispatch(setHeader(header))
      dispatch(setComponents(components))
    }
  )
}

export {pageSlice}