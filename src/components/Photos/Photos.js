import React, { PropTypes } from 'react'
import { Divider, Avatar, Space, Text, Flex, Heading, Block, Media, Card, CardImage } from 'rebass'

const Photo = ({ id, name, image_url, description, user, url }) => (
  <Card
    style={{
      boxShadow: '0 0 15px 1px #999',
      borderWidth: 0
    }}
    rounded={false}
  >
    <CardImage
      key={id}
      style={{transition: 'opacity .5s ease-in'}}
      src={image_url}
    />
    <Heading level={3}>
      {name}
    </Heading>
    <Divider />
    <Text
      children={description}
    />
    <Divider />
    <Avatar
      circle={false}
      size={48}
      src={user.userpic_url}
    />
  </Card>
)

Photo.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired
}


const Photos = ({ photos }) => (
  <div>
    {photos.map(photo =>
    <span key={photo.id}>
      <Photo
        key={photo.id}
        {...photo}
      />
      <Space  x={1} />
    </span>
    )}
  </div>
)

Photos.defaultProps = { photos: []}

Photos.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Photos
