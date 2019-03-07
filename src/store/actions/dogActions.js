
export default function fetchBreeds() {
  return (dispatch) => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        let dogArray = [];
        for (let key in data.message) {
          if (data.message[key].length === 0) {
            dogArray.push(key);
          } else {
            for (let i = 0; i < data.message[key].length; i++) {
              dogArray.push(`${data.message[key][i]} ${key}`);
            }
          }
        }
        dispatch({type: 'SET_BREED_LIST', payload: dogArray});
    })
  }
};


export function formatSearch(breed) {
  if (breed.split(' ').length !== 1) {
    return breed.split(' ').reverse().join(' ').replace(' ', '-');
  } else {
    return breed;
  }
}


export function getResults(breed) {
  return (dispatch) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          dispatch({type: 'TOGGLE_404', payload: true});
          dispatch({type: 'TOGGLE_LOADING', payload: false});
        }
      })
      .then((data) => {
        dispatch({type: 'SET_RESULTS', payload: data.message});
        dispatch({type: 'UPDATE_DISPLAYED', payload: data.message.slice(0, 12)});
        dispatch({type: 'TOGGLE_LOADING', payload: false});
      })
      .catch((error) => console.log('There was a problem: ', error.message));
  }
}
