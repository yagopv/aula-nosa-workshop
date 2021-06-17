const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const validators = require("./lib/validators");

const BASE_URL = "/api";

const app = express();
let movies = [];

app.use(cors());
app.use(bodyParser.json());
app.use(validators.validatorMiddleware);

app.get(`${BASE_URL}/movies`, (req, res) => {
  res.status(200).send(movies);
});

app.post(`${BASE_URL}/movies`, (req, res) => {
  const newMovie = req.body;

  newMovie.id = uuidv4();
  newMovie.createdAt = Date.now();
  movies.push(newMovie);

  res.status(201).send(newMovie);
});

app.put(`${BASE_URL}/movies/:id`, (req, res) => {
  movies = movies.map((movie) => {
    if (movie.id === req.params.id) {
      return {
        id: movie.id,
        createdAt: movie.createdAt,
        ...req.body,
        updatedAt: Date.now(),
      };
    }

    return movie;
  });

  res.status(204).send();
});

app.patch(`${BASE_URL}/movies/:id`, (req, res) => {
  movies = movies.map((movie) => {
    if (movie.id === req.params.id) {
      return {
        id: movie.id,
        createdAt: movie.createdAt,
        ...req.body,
        updatedAt: Date.now(),
      };
    }

    return movie;
  });

  res.status(204).send();
});

app.delete(`${BASE_URL}/movies/:id`, (req, res) => {
  movies = movies.filter((movie) => {
    return movie.id !== req.params.id;
  });

  res.status(202).send();
});

app.listen(3000, () => {
  console.log("Server listening in PORT 3000");
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
