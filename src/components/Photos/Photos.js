import React from 'react'

export default class Photos extends React.Component {
  static propTypes = {
    photos: React.PropTypes.array.isRequired
  }

  render() {
    const { photos } = this.props
    return (
      <ul>
        { photos.map((photo) => {
            <img key={photo.id} title={photo.name} src={photo.image_url} />
          })
        }
      </ul>
    )
  }
}

