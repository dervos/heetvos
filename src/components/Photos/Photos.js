import React, { PropTypes } from 'react'

const Photos = ({ photo }) => (
  <ul>
    <img key={photo.id} title={photo.name} src={photo.image_url} />
  </ul>
)

Photos.propTypes = {
  photo: PropTypes.object.isRequired
}

export default Photos
