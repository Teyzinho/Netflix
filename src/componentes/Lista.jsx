import React, { useEffect, useState } from "react";
import { getMovies } from "../api";
import './Lista.css'

const urlImage = "https://image.tmdb.org/t/p/original";

function Lista({ title, path }) {
  const [filmes, setFilmes] = useState([]);

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      // console.log("data ", data);
      setFilmes(data?.results);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="filme-card">
        {filmes?.map(filme => {
          return (
            <div>
              <img
                key={filme.id}
                src={`${urlImage}${filme.backdrop_path ? filme.backdrop_path : filme.poster_path}`}
                alt={filme.name}
              />
            </div>
          );

        })
        }
      </div>

    </div>
  )
    ;
}

export default Lista;