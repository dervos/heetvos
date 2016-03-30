import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import Helmet from 'react-helmet'
import { selectMethod, fetchPhotosIfNeeded, invalidateMethod } from 'redux/modules/photos'
import { Photos } from 'components'

import { Container, Section, PageHeader } from 'rebass'

const options = [
  {children: 'user', value: 'user'},
  {children: 'popular', value: 'popular'}
]

const mapStateToProps = (state) => {
  const { selectedMethod, photosFromMethod } = state

  const {
    isFetching, lastUpdated, items: photos
  } = photosFromMethod[selectedMethod] || { isFetching: true, items: []}

  return {
    selectedMethod,
    photos,
    isFetching,
    lastUpdated
  }
}

@asyncConnect([mapStateToProps, {
  promise: ({store: {dispatch, getState}}) => {
    const promises = []
    return Promise.all(dispatch(fetchPhotosIfNeeded(getState.selectedMethod)))
  },
  showPhoto: (id) => {
    return dispatch(showPhoto(id))
  },
  selectMethod: (nextMethod) => {
    return dispatch(selectMethod(nextMethod))
  },
  invalidateMethod: (selectedMethod) => {
    return dispatch(invalidateMethod(selectedMethod))
  }
}])
@connect(mapStateToProps)
export default class Gallery extends React.Component {
  //componentDidMount() {
  //  this.props.fetchPhotosIfNeeded(this.props.selectedMethod)
  //}

  //componentWillReceiveProps(nextProps) {
  //  if (nextProps.selectedMethod !== this.props.selectedMethod) {
  //    this.props.fetchPhotosIfNeeded(nextProps.selectedMethod)
  //  }
  //}

  handleChange = (nextMethod) => {
    this.props.dispatch(selectMethod(nextMethod))
  }

  handleRefreshClick = (e) => {
    e.preventDefault()

    const { selectedMethod } = this.props
    dispatch(invalidateMethod(selectedMethod))
    dispatch(fetchPhotosIfNeeded(selectedMethod))
  }

  render() {
    const { selectedMethod, photos, isFetching, lastUpdated } = this.props
    const isEmpty = photos.length === 0
    return (
      <div style={{paddingTop: 48}}>
        <Helmet title={selectedMethod} />
        <PageHeader heading={selectedMethod} />
        <Photos {...photos} onPhotoLoad={() => showPhoto} />
      </div>
    )
  }
}

Gallery.propTypes = {
  selectedMethod: PropTypes.string.isRequired,
  photos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
}

