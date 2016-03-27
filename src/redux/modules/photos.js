
const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
const SELECT_METHOD = 'SELECT_METHOD';
const INVALIDATE_METHOD = 'INVALIDATE_METHOD';


export function selectedMethod(state = 'user', action) {
  switch (action.type) {
    case SELECT_METHOD:
      return action.method;
    default:
      return state;
  }
}

function photos(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_METHOD:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_PHOTOS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PHOTOS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.photos,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

export function photosFromMethod(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_METHOD:
    case RECEIVE_PHOTOS:
    case REQUEST_PHOTOS:
      return Object.assign({}, state, {
        [action.method]: photos(state[action.method], action)
      });
    default:
      return state;
  }
}

export function selectMethod(method) {
  return {
    type: SELECT_METHOD,
    method
  };
}

export function invalidateMethod(method) {
  return {
    type: INVALIDATE_METHOD,
    method
  };
}

function requestPhotos(method) {
  return {
    type: REQUEST_PHOTOS,
    method
  };
}

function receivePhotos(method, json) {
  return {
    type: RECEIVE_PHOTOS,
    method: method,
    photos: json.photos.map(photo => photo),
    receivedAt: Date.now()
  };
}

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

