import React, { PropTypes } from 'react'

const Photos = ({ photos }) => (
  <ul>
    { photos.map((photo) => {
      <img key={photo.id} title={photo.name} src={photo.image_url} />
      })
    }
  </ul>
)

Photos.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Photos
