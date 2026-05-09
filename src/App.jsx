import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'

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

  const fetchMovies = async () => {
    
    try{
      const endpoint = `${API_BASE_URL}/movies/popular?extended=full`;

      const response = await fetch(endpoint, API_OPTIONS);
      
      const data = await response.json();
    }
    catch(error){
      console.log(`Error fetching movies : ${error}`);
      setErrorMessage('Error fetching movies, Please try again later.');
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

        <section className='all movies'>
          <h2>All Movies</h2>

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>
      </div>
    </main>
  )
}

export default App