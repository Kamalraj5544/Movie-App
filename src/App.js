import React, { useEffect, useState } from "react";

import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com?apikey=bdef8e5f";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (movTitle) => {
    const response = await fetch(`${API_URL}&s=${movTitle}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(search);
  }, [search]);

  useEffect(() => {
    searchMovies("avatar");
  }, []);

  return (
    <div className="app">
      <h1>Movie App</h1>
      <div className="search">
        <input
          placeholder="Search for movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(search)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movieProp={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
