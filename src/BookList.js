import React from 'react';
import BookCard from "./BookCard";
import { Grid, Typography} from "@material-ui/core";

function BookList({books}) {
  return (
    <Grid container spacing={4}>
      {
        books.length ?
          books.map(book => <BookCard key={book.id} {...book} />) :
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h3" component="div" color="error" >
                No Results
              </Typography>
            </Grid>
          </Grid>
      }
    </Grid>
  )
}

export default BookList;