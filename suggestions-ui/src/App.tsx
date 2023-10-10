import React, { useState } from 'react';
import AutoComplete from './components/autocomplete';
import { Country } from './interfaces/Country.interface';

import './App.css';
import { debounce } from 'lodash';
import { DEBOUNCE_TIME } from './constants';

function App() {
  const [suggestions, setSuggestions] = useState<Country[]>([]);

  async function search(query: string) {
    if (query !== '') {
      const response = await fetch(`http://localhost:5000/countries?query=${query}`);
      const body = await response.json();
      return body;
    } else {
      setSuggestions([]);
    }
  }

  const debouncedSearch = debounce(async (query) => {
    setSuggestions(await search(query));
  }, DEBOUNCE_TIME);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };

  return (
    <>
      <div className="search-box">
        <h2>Search</h2>
        <div className="input-box">
          <input
            type="text"
            name="search"
            placeholder="Search here"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="suggestion-box">
          {suggestions?.length > 0 && <AutoComplete suggestions={suggestions}></AutoComplete>}
        </div>
      </div>
    </>
  );
}

export default App;
