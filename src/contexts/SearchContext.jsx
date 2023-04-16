import React, {createContext, useState} from 'react';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const SearchContext = createContext();
const FAVOURTIES_KEY = 'favourites';
const PAGE_SIZE = 3;
const initSearchCtx = {
  keyword: null,
  moreToFetch: false,
  page: 1,
  newsList: [],
};

function SearchContextProvider({children}) {
  const cached = localStorage.getItem(FAVOURTIES_KEY);
  const [favouriteList, setFavouriteList] = useState(
    cached ? JSON.parse(cached) : []
  );
  const [searchCtx, setSearchCtx] = useState(initSearchCtx);

  console.log(searchCtx);

  const doSearch = optionalKeyword => {
    var keyword;
    var tempList;
    if (optionalKeyword !== null) {
      keyword = optionalKeyword;
      tempList = [];
    } else {
      keyword = searchCtx.keyword;
      tempList = [...searchCtx.newsList];
    }
    const page = optionalKeyword === null ? searchCtx.page + 1 : 1;
    fetch(
      'https://newsapi.org/v2/everything?' +
        `q=${keyword}&` +
        `pageSize=${PAGE_SIZE}&` +
        `page=${page}&` +
        'sortBy=popularity&' +
        `apiKey=${apiKey}`
    )
      .then(res => res.json())
      .then(data => {
        const moreToFetch = data.articles.length === PAGE_SIZE;
        setSearchCtx({
          keyword,
          moreToFetch,
          page,
          newsList: [...tempList, ...data.articles],
        });
      });
  };

  const doSaveToFavourite = news => {
    const found = favouriteList.filter(item => item.title === news.title);
    console.log(found);
    if (found.length > 0) return;

    const newFavouriteList = [...favouriteList, news];
    setFavouriteList(newFavouriteList);
    localStorage.setItem(FAVOURTIES_KEY, JSON.stringify(newFavouriteList));
  };

  const doRemoveFavourite = title => {
    setFavouriteList(favouriteList.filter(item => item.title !== title));
  };

  const doRemoveAllFavourite = () => {
    setFavouriteList([]);
  };

  const doFetchMore = () => {
    doSearch(null);
  };

  return (
    <SearchContext.Provider
      value={{
        favouriteList,
        searchCtx,
        doSearch,
        doFetchMore,
        doSaveToFavourite,
        doRemoveFavourite,
        doRemoveAllFavourite,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export {SearchContext, SearchContextProvider};
