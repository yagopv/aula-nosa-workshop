import React, { useState } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

const BASE_URL = "http://localhost:3000/api";

function App() {
  const [hasError, setHasError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  React.useEffect(() => {
    fetch(`${BASE_URL}/movies`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      });
  }, []);

  function handleRemove(id) {
    fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 202) {
        setMovies(movies.filter((movie) => movie.id !== id));
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newMovie = { title, description };
    fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setHasError(true);
          return;
        }

        setHasError(false);
        setMovies([data, ...movies]);
        setTitle("");
        setDescription("");
      });
  }

  return (
    <main>
      <MovieList movies={movies} onRemove={handleRemove} />
      <hr />
      <MovieForm
        title={title}
        onChangeTitle={setTitle}
        description={description}
        onChangeDescription={setDescription}
        onSave={handleSubmit}
        hasError={hasError}
      />
    </main>
  );
}

export default App;
