import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';

import NewsCard from './NewsCard';
import {useContext} from 'react';
import {SearchContext} from '../contexts/SearchContext';
import {Button} from '@mui/material';

export default function NewsItem(props) {
  const {searchCtx, doFetchMore} = useContext(SearchContext);
  return (
    <Box component="main" sx={{flexGrow: 1, p: 3}}>
      <Toolbar />
      {searchCtx.newsList.length > 0 ? (
        <>
          <ImageList variant="woven" gap={8} cols={3}>
            {searchCtx.newsList.map((item, index) => (
              <NewsCard key={`news-${index}`} news={item} />
            ))}
          </ImageList>
          {searchCtx.moreToFetch && (
            <Button variant="contained" onClick={() => doFetchMore()}>
              Fetch more
            </Button>
          )}
        </>
      ) : (
        <div>No news found!</div>
      )}
    </Box>
  );
}
