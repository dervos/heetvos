import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import Helmet from 'react-helmet'
import { selectMethod, fetchPhotosIfNeeded, invalidateMethod } from 'redux/modules/photos'
import { Photos, Picker } from 'components'
import { Space, Section, PageHeader } from 'rebass'

const options = [
  {children: 'user', value: 'user'},
  {children: 'popular', value: 'popular'}
]

const mapStateToProps = (state) => {
  const { selectedMethod, photosFromMethod } = state

  const {
    isFetching, lastUpdated, photos
  } = photosFromMethod[selectedMethod] || { isFetching: true, photos: [] }

  return {
    selectedMethod,
    photos,
    isFetching,
    lastUpdated
  }
}

@asyncConnect([{
  deferred: false,
  promise: ({store: {dispatch, getState}}) => {
    const promises = []
    promises.push(dispatch(fetchPhotosIfNeeded(getState().selectedMethod)))
    return Promise.all(promises)
  }
}])
@connect(mapStateToProps)
export default class Gallery extends React.Component {
  componentDidMount() {
    fetchPhotosIfNeeded(this.selectedMethod)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMethod !== this.selectedMethod) {
      fetchPhotosIfNeeded(nextProps.selectedMethod)
    }
  }

  handleChange = (nextMethod) => {
    this.props.dispatch(selectMethod(nextMethod))
  }

  handleRefreshClick = (e) => {
    e.preventDefault()

    invalidateMethod(this.selectedMethod)
    fetchPhotosIfNeeded(this.selectedMethod)
  }

  render() {
    const { selectedMethod, photos, isFetching, lastUpdated } = this.props
    return (
      <div >
        <Helmet title={selectedMethod} />
        <PageHeader heading={selectedMethod} />
        <Picker value={selectedMethod} onChange={this.handleChange} options={options} /><Space x={2} />
        <Photos style={{flexWrap: 'wrap', float:'left' }} value={selectedMethod} photos={photos} />
      </div>
    )
  }
}

Gallery.defaultProps = {
  selectedMethod: 'user',
  photos: [],
  isFetching: false
}

Gallery.propTypes = {
  selectedMethod: PropTypes.string.isRequired,
  photos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
}
