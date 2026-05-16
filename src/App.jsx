import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'

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

  const[searchTerm, setSearchTerm] = useState(''); 

  const[errorMessage, setErrorMessage] = useState('');

  const[movieList, setMovieList] = useState([]);

  const[isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {

    setIsLoading(true);
    setErrorMessage('');
    
    try{
      const endpoint = `${API_BASE_URL}/movies/popular?extended=full`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();

      if(!data || data.length === 0){
        setErrorMessage('Failed to fetch  movies');
        setMovieList([]);
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

  useEffect(() => {
    fetchMovies();
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

        <section className='all-movies'>
          <h2 className="mt-10">All Movies</h2>

            {isLoading ? (
              <Spinner/>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <p key={movie.ids.tmdb} className="text-white">{movie.title}</p>
                ))}
              </ul>  
            )}
        </section>
      </div>
    </main>
  )
}

export default App