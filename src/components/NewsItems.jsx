import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import {useQuery} from '@tanstack/react-query';

import NewsCard from './NewsCard';
import {useContext} from 'react';
import {SearchContext} from '../contexts/SearchContext';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

export default function NewsItem(props) {
  const {keyword} = useContext(SearchContext);

  const {isLoading, error, data} = useQuery({
    queryKey: ['newsFetch'],
    queryFn: () =>
      fetch(
        'https://newsapi.org/v2/everything?' +
          `q=${keyword}&` +
          'sortBy=popularity&' +
          `apiKey=${apiKey}`
      ).then(res => res.json()),
  });

  console.log(data);
  return (
    <Box component="main" sx={{flexGrow: 1, p: 3}}>
      <Toolbar />
      <ImageList variant="woven" gap={8} cols={3}>
        {/* {data.map(item => (
          <NewsCard news={item} />
        ))} */}
      </ImageList>
    </Box>
  );
}
