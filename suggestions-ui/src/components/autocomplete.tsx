import React from 'react';
import { Country } from '../interfaces/Country.interface';

import './autocomplete.css';

const AutoComplete = (props: { suggestions: Country[] }) => {
  const { suggestions } = props;

  return (
    <div className="autocomplate">
      <div className="autocomplate-suggestions">
        {suggestions.map((suggestion: Country) => (
          <b onClick={() => alert(suggestion.name)} key={suggestion.code2}>
            {suggestion.name}
          </b>
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;
