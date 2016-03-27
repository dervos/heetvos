import React from 'react'
import { connect } from 'react-redux'
import {
  selectMethod,
  fetchPhotosIfNeeded,
  invalidateMethod
} from 'redux/modules/photos'
import { asyncConnect } from 'redux-async-connect';

import { Picker, Photos } from 'components'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch, selectedMethod } = this.props
    dispatch(fetchPhotosIfNeeded(selectedMethod))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMethod !== this.props.selectedMethod) {
      const { dispatch, selectedMethod } = nextProps
      dispatch(fetchPhotosIfNeeded(selectedMethod))
    }
  }

  handleChange = (nextMethod) => this.props.dispatch(selectMethod(nextMethod))

  handleRefreshClick = (e) => {
    e.preventDefault()

    const { dispatch, selectedMethod } = this.props
    dispatch(invalidateMethod(selectedMethod))
    dispatch(fetchPhotosIfNeeded(selectedMethod))
  }

  render() {
    const { selectedMethod, photos, isFetching, lastUpdated } = this.props
    const isEmpty = photos.length === 0
    return (
      <div>
        <Picker value={selectedMethod}
          onChange={this.handleChange}
          options={[
            'user',
            'popular',
            'highest_rated',
            'upcoming',
            'fresh_today',
            'fresh_yesterday',
            'fresh_week'
          ]}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
              onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Photos photos={photos} />
            </div>
        }
      </div>
    )
  }
}

Gallery.propTypes = {
  selectedMethod: React.PropTypes.string.isRequired,
  photos: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  lastUpdated: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedMethod, photosFromMethod } = state
  const {
    isFetching,
    lastUpdated,
    items: photos
  } = photosFromMethod[selectedMethod] || {
    isFetching: true,
    items: []
  }

  return {
    selectedMethod,
    photos,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Gallery)
