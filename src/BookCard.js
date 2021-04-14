import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Grid, Link, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "100%"
  }
})

const palceholderImage = "https://t4.ftcdn.net/jpg/01/90/50/61/360_F_190506160_coExNloNdTd1OcvJe3cbdddUDqoqiJ2B.jpg"

function BookCard({...book}) {

  const classes = useStyles()

  let image = palceholderImage

  if (book.volumeInfo.imageLinks === undefined) {
    if (book.previewLink !== undefined) {
      image = book.previewLink
    }
  } else if (book.volumeInfo.imageLinks.thumbnail !== undefined) {
    image = book.volumeInfo.imageLinks.thumbnail
  }

  const title = book.volumeInfo.title
  const description = book.volumeInfo.description ? book.volumeInfo.description.substr(0, 150) + "..." : "No description available"
  const preview = book.volumeInfo.previewLink
  const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "No authors specified"

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
          <Typography variant="subtitle1" component="p">
            By: {author}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={preview} target="_blank" rel="noopener">
            learn more
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default BookCard;