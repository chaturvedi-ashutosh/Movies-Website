import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { updateSearchCount, getTrendingMovies } from './appwrite.js'

const API_BASE_URL = '/api';

const API_KEY = import.meta.env.VITE_CLIENT_ID;

const API_SECRET = import.meta.env.VITE_CLIENT_SECRET;


const API_OPTIONS = {
  method : 'GET',
  headers : {
    'Content-Type' : 'application/json',
    'User-Agent' : 'MoviesWebsite/1.0.0',
    'trakt-api-key' : `${API_KEY}`,
    'trakt-api-version' : 2
  }
}

const App = () => {

  const[debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const[searchTerm, setSearchTerm] = useState(''); 

  const[movieList, setMovieList] = useState([]);
  const[errorMessage, setErrorMessage] = useState('');
  const[isLoading, setIsLoading] = useState(false);

  const[trendingMovies, setTrendingMovies] = useState([]);
  
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');
    
    try{
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&type&extended=full`
      : `${API_BASE_URL}/movies/popular?extended=full`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      console.log('Fetched movies : ', data);

      if(!data){
        setErrorMessage('Failed to fetch movies');
        return;
      }
      if(data.length === 0){
        setErrorMessage('No matching movies found!');
        setMovieList([]);
        return;
      }

      if(query){
        const movies = data.map(item => item.movie);
        setMovieList(movies);
        await updateSearchCount(query, movies[0]);
        return;
      }

      setMovieList(data || []);
    }
    catch(error){
      console.log(`Error fetching movies : ${error}`);
      setErrorMessage('Error fetching movies, Please try again later.');
    } finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);

    } catch (error) {
      console.error('Error loading trending movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">

        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle!</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

            {isLoading ? (
              <Spinner/>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.ids.tmdb} movie={movie} />
                ))}
              </ul>  
            )}
        </section>
      </div>
    </main>
  )
}

export default App