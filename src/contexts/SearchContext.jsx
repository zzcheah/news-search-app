import React, {createContext, useState} from 'react';

const SearchContext = createContext();

function SearchContextProvider({children}) {
  const [keyword, setKeyword] = useState('');

  return (
    <SearchContext.Provider value={{keyword, setKeyword}}>
      {children}
    </SearchContext.Provider>
  );
}

export {SearchContext, SearchContextProvider};
