import React, { useState } from 'react';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the movie data to the backend (or just log it for now)
    console.log({ title, review });
    setTitle('');
    setReview('');
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddMovie;
