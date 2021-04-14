import React, {useState} from 'react';
import {
  Button,
  Collapse,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  makeStyles, MenuItem, Select,
  TextField
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import languages from './languageCodes.js'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    marginBottom: 40
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))


function BookSearch({searchBooks}) {

  const classes = useStyles()
  const [searchString, setSearchString] = useState("")
  const [orderBy, setOrderBy] = useState("relevance")
  const [languagePicked, setLanguagePicked] = useState("en")
  const [maxResults, setMaxResults] = useState(10)
  const [filter, setFilter] = useState("")
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [inputError, setInputError] = useState(false)

  const toggleShowAdvancedSearch = event => {
    event.preventDefault()
    setShowAdvancedSearch(!showAdvancedSearch)
  }

  const setSearchQuery = query => {
    setSearchString(query)
    if (!query) setInputError(true)
    else setInputError(false)
  }

  const validateInputAndSearchBooks = (searchString, orderBy, languagePicked, maxResults, filter) => {
    if (!searchString) {
      setInputError(true)
      return
    }
    searchBooks(searchString, orderBy, languagePicked, maxResults, filter)
  }

  const SearchButton = () => (
    <IconButton onClick={() => validateInputAndSearchBooks(searchString, undefined, undefined, undefined, undefined)}>
      <SearchIcon/>
    </IconButton>
  )

  return (
    <Container maxWidth="sm" className={classes.root}>
      <TextField id="standard-basic" label="Search" value={searchString}
                 fullWidth onChange={e => setSearchQuery(e.target.value)}
                 InputProps={{endAdornment: <SearchButton/>, style: {fontSize: "1.5rem"}}}
                 InputLabelProps={{style: {fontSize: "1.5rem"}}}
                 {...(inputError ? {helperText: "Please enter search query", error: inputError} : {})}
      />
      <Link href="#" onClick={e => {
        toggleShowAdvancedSearch(e)
      }} color="inherit">
        Advanced search
      </Link>
      <Collapse in={showAdvancedSearch}>
        <FormControl className={classes.formControl}>
          <InputLabel id="Order by">Order by</InputLabel>
          <Select
            labelId="Order by"
            id="select-order-by"
            value={orderBy}
            onChange={e => {
              setOrderBy(e.target.value)
            }}
          >
            <MenuItem value={"relevance"}>Relevance</MenuItem>
            <MenuItem value={"newest"}>Newest</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="max-results"
            label="Max results"
            type="number"
            InputProps={{inputProps: {min: 1, max: 40}}}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setMaxResults(e.target.value)}
            value={maxResults}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="Language">Language</InputLabel>
          <Select
            labelId="Language"
            id="select-language"
            value={languagePicked}
            onChange={e => {
              setLanguagePicked(e.target.value)
            }}
          >
            <MenuItem value={""}>Any</MenuItem>
            {
              languages.map(language => <MenuItem key={language.alpha2}
                                                  value={language.alpha2}>{language.English}</MenuItem>)
            }
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="filter">Filter</InputLabel>
          <Select
            labelId="filter"
            id="select-filter"
            value={filter}
            onChange={e => {
              setFilter(e.target.value)
            }}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"partial"}>Partial</MenuItem>
            <MenuItem value={"full"}>Full</MenuItem>
            <MenuItem value={"free-ebooks"}>Free eBooks</MenuItem>
            <MenuItem value={"paid-ebooks"}>Paid eBooks</MenuItem>
            <MenuItem value={"ebooks"}>EBooks</MenuItem>
          </Select>
        </FormControl>

        <Button color="primary" variant="contained"
                onClick={() => validateInputAndSearchBooks(searchString, orderBy, languagePicked, maxResults, filter)}>
          Advanced Search <SearchIcon/>
        </Button>
      </Collapse>
    </Container>
  );
}

export default BookSearch;