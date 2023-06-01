import React, { useEffect, useState } from "react";
import { getMovies } from "../api";

function Lista({ title, path }) {
  const [filmes, setFilmes] = useState([]);

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      console.log("data ", data);
      setFilmes(data?.results);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return <div>Lista</div>;
}

export default Lista;