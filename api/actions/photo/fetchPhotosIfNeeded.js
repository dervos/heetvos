
function fetchPhotos(method) {
  return dispatch => {
    dispatch(requestPhotos(method));
    return fetch(`https://api.500px.com/v1/photos?feature=${method}&username=dervos&consumer_key=GvEAXk6cHDuELGqcaV38N2w7LjBTgcha8oVn8zwY&image_size=3&sort=created_at&rpp=25`)
      .then(response => response.json())
      .then(json => dispatch(receivePhotos(method, json)));
  };
}

function shouldFetchPhotos(state, method) {
  const photos = state.photosFromMethod[method];
  if (!photos) {
    return true;
  }
  if (photos.isFetching) {
    return false;
  }
  return photos.didInvalidate;
}

export function fetchPhotosIfNeeded(method) {
  return (dispatch, getState) => {
    if (shouldFetchPhotos(getState(), method)) {
      return dispatch(fetchPhotos(method));
    }
  };
}
