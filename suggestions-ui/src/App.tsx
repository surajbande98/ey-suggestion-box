import React, { useState } from 'react';
import AutoComplete from './components/autocomplete';
import { Country } from './interfaces/Country.interface';

import './App.css';

function App() {
  const [searchedValue, setSearchedValue] = useState('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;

    if (query !== '') {
      setSearchedValue(query);
      fetch(`http://localhost:5000/countries?query=${query}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((jsonResponse) => jsonResponse.json())
        .then((result) => setSuggestions(result))
        .catch(() => setSuggestions([]));
    } else {
      setSearchedValue(query);
      setSuggestions([]);
    }
  };

  const onClearSearchQuery = () => {
    setSearchedValue('');
    setSuggestions([]);
  };

  return (
    <>
      <div className="search-box">
        <h2>Search</h2>
        <div className="input-box">
          <input
            type="text"
            value={searchedValue}
            name="search"
            placeholder="Search here"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
          />
          {searchedValue && (
            <button className="erase-query" onClick={() => onClearSearchQuery()}>
              x
            </button>
          )}
        </div>
        <div className="suggestion-box">
          {suggestions.length > 0 && <AutoComplete suggestions={suggestions}></AutoComplete>}
        </div>
      </div>
    </>
  );
}

export default App;
