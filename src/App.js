import {useState, useEffect} from 'react';
import BookSearch from "./BookSearch";
import BookList from "./BookList";
import {Box, Container, Typography} from "@material-ui/core";

const apiQueryURI = 'https://www.googleapis.com/books/v1/volumes'
const apiKey = 'AIzaSyC1p9RDZCwjuvw1gYG-m5RbeoPCqa6Pcy8'

const loadingGifURI = 'https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg'

const fetchBooks = async (query, orderBy, language, maxResults, filter) => {
  let fetchURI = `${apiQueryURI}?q=${query}&key=${apiKey}&maxResults=${maxResults}`
  if (orderBy && orderBy.length > 0) fetchURI += `&orderBy=${orderBy}`
  if (language && language.length > 0) fetchURI += `&langRestrict=${language}`
  if (filter && filter.length > 0) fetchURI += `&filter=${filter}`
  const queryResult = await fetch(fetchURI)
  const parsed = await queryResult.json()
  return parsed.items || []
}

function App() {

  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([])

  useEffect(() => {
    searchBooks("lord of the rings")
  }, [])

  const searchBooks = (query, orderBy = "", language = "", maxResults = 10, filter = "") => {
    const fetchBooksAsync = async () => {
      setLoading(true)
      const fetched = await fetchBooks(query, orderBy, language, maxResults, filter)
      setBooks(fetched)
      setLoading(false)
    }
    fetchBooksAsync()
  }

  return (
    <Container>
      <Typography variant="h1" align="center">
        Book Search
      </Typography>
      <BookSearch searchBooks={searchBooks}/>
      {loading ? (
          <Box display="flex" justifyContent="center">
            <img src={loadingGifURI} alt="Loading gif" width={"20%"}/>
          </Box>) :
        <BookList books={books}/>
      }
    </Container>
  );
}

export default App;
