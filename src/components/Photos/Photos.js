import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Photo = ({name, image_url, onLoad, loaded }) => (
  <img
    style={{
      opacity: loaded ? 1 : 0,
      transition: 'opacity .5s ease-in'}}
    src={image_url}
    onLoad={onLoad}
    title={name} />
)

Photo.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
}

Photo.defaultProps = { loaded: false }

const Photos = ({ photos, onPhotoLoad }) => (
  <div>
    {photos.map((index, photo) =>
      <Photo
        key={index}
        {...photo}
        onLoad={() => onPhotoLoad(index)}
      />
    )}
  </div>
)

Photos.defaultProps = { photos: []}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  onPhotoLoad: PropTypes.func.isRequired
}

export default Photos
