import React from 'react'

const MovieCard = ({ movie : 
    { title, rating, images: { poster }, released, language }
 }) => {
  return (
    <div className="movie-card">
        <img src={poster?.[0] ? `https://${poster[0]}` : './no-movie.png'} alt={title} />

        <div className="mt-4">
            <h3>{title}</h3>

            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{rating ? rating.toFixed(1) : 'N/A'}</p>

                    <span>&nbsp;•&nbsp;</span>
                    <p className="lang">
                        {language || 'N/A'}
                    </p>

                    <span>&nbsp;•&nbsp;</span>
                    <p className="year">
                        {released ? released.split('-')[0] : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard