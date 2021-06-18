import React from "react";

export default function MovieList({ movies, onRemove }) {
  return (
    <React.Fragment>
      {movies.length === 0 && <p>No elements in the list of movies</p>}
      {movies.length !== 0 && (
        <ul>
          {movies.map(({ id, title, description }) => {
            return (
              <li key={id}>
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={() => onRemove(id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
}
