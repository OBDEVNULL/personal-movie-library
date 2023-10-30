import React, { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=REACT_APP_TMDB_API_KEY`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => console.error("Error fetching the movies:", error));
  }, []);

  const handleMovieClick = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=REACT_APP_TMDB_API_KEY`)
      .then(response => response.json())
      .then(data => {
        setSelectedMovie({
          ...movies.find(movie => movie.id === movieId),
          reviews: data.results
        });
        setIsModalOpen(true);
      })
      .catch(error => console.error("Error fetching the reviews:", error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <div>
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title} 
              />
            </div>
            <div>
              <strong>{movie.title}</strong>
              <p>Genres: {movie.genre_ids.join(', ')}</p>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Reviews for {selectedMovie.title}</h3>
            <ul>
              {selectedMovie.reviews.map(review => (
                <li key={review.id}>
                  <strong>{review.author}:</strong> {review.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
