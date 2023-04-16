import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {SearchContext} from '../contexts/SearchContext';
import {CardActionArea} from '@mui/material';
import {Link} from 'react-router-dom';

function hashToColor(char) {
  const charCode = char.charCodeAt(0);
  const hash = ((charCode << 5) - charCode) * 2654435761;
  const color = '#' + ('00000' + (hash >>> 0).toString(16)).slice(-6);
  return color;
}

export default function NewsCard({news}) {
  const {doSaveToFavourite} = React.useContext(SearchContext);
  const [fav, setFav] = React.useState(false);

  const initial = news.source.name[0];
  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea LinkComponent={Link} to={news.url} target="_blank">
        <CardHeader
          avatar={
            <Avatar sx={{bgcolor: hashToColor(initial)}} aria-label="recipe">
              {initial}
            </Avatar>
          }
          title={news.source.name}
          subheader={new Date(news.publishedAt).toLocaleDateString()}
        />
        <CardMedia
          component="img"
          height="194"
          image={news.urlToImage}
          alt="news-placeholder"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {news.title}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            doSaveToFavourite(news);
            setFav(true);
          }}
        >
          <FavoriteIcon sx={{color: fav ? 'red' : 'grey'}} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
