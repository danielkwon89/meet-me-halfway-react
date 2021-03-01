import axios from 'axios';

export const fetchRestaurants = (searchValues) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_RESTAURANTS' });
    axios.post('http://localhost:3000/search', {
        term: searchValues.term,
        latitude: searchValues.latitude,
        longitude: searchValues.longitude
      })
      .then((res) => {
        dispatch({
          type: 'FETCH_RESTAURANTS',
          businesses: res.data.businesses
        });
      })
      .catch(err => console.log(err))
  };
};