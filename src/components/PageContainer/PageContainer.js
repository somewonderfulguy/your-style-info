// TODO replace redux with react context
// TODO move the component to /components folder
import {connect} from 'react-redux'

import Page from 'components/Page'
import {pageSlice} from 'slices'

const mapStateToProps = ({pageSlice}) => ({
  header: pageSlice.header,
  components: pageSlice.components
})

const mapDispatchToProps = {
  fetchPageData: pageSlice.effects.fetchPageData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)