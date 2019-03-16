const initState = {
  // the breed list is fetched when the application first loads
  breedList: [],
  // dogImage and dogName are used in the Home component
  dogImage: '',
  dogName: '',
  // searchInput and searchFocus apply to the Searchbar and Autosuggest components
  searchInput: '',
  searchFocus: false,
  // the following properties apply to the Results component
  results: [],
  displayed: [],
  isLoading: true,
  is404: false
};


export default function dogReducer(state = initState, action) {
  switch (action.type) {
    case 'SET_BREED_LIST':
      return {
        ...state,
        breedList: action.payload
      };
    case 'SET_DOG_IMAGE':
      return {
        ...state,
        dogImage: action.payload
      };
    case 'SET_DOG_NAME':
      return {
        ...state,
        dogName: action.payload
      };
    case 'CHANGE_SEARCH_INPUT':
      return {
        ...state,
        searchInput: action.payload
      };
    case 'CLEAR_SEARCH_INPUT':
      return {
        ...state,
        searchInput: ''
      };
    case 'FOCUS_SEARCH':
      return {
        ...state,
        searchFocus: true
      };
    case 'BLUR_SEARCH':
      return {
        ...state,
        searchFocus: false
      };
    case 'TOGGLE_404':
      return {
        ...state,
        is404: action.payload
      };
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload
      };
    case 'UPDATE_DISPLAYED':
      return {
        ...state,
        displayed: state.displayed.concat(action.payload)
      };
    case 'CLEAR_DISPLAYED':
      return {
        ...state,
        displayed: []
      };
    default:
      return state;
  }
}
