import React from "react";
const BASE_URL = "http://localhost:3000/api";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    fetch(`${BASE_URL}/movies`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const newMovie = { title, description };
    fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <main>
      <ul>
        {movies.map(({ title, description }) => {
          return (
            <li>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          );
        })}
      </ul>

      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </main>
  );
}

export default App;
