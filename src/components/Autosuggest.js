import React from 'react';

const Autosuggest = (props) => {
  if (props.searchInput == '' || !props.searchFocus) {
    return null;
  } else {
    return (
      <ul id="auto-suggest">
        {props.breedList.filter((current) => {
          if (current.startsWith(props.searchInput) || current.split(' ').length > 1 && current.split(' ')[1].startsWith(props.searchInput)) {
            return current;
          }
        }).map((current) => {
          return <li className="search-suggestion" data-value={current} key={current} onMouseDown={props.updateSearch}>{current}</li>;
        })}
      </ul>
    )
  }
}

export default Autosuggest;
