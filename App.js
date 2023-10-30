import React from 'react';
import './App.css';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Movie Library</h1>
      </header>
      <AddMovie />
      <MovieList />
    </div>
  );
}

export default App;
