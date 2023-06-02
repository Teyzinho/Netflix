import React, { useEffect, useState, useRef } from "react";
import { getMovies } from "../api";
import './Lista.css';

const urlImage = "https://image.tmdb.org/t/p/original";

function Lista({ title, path }) {
  const [filmes, setFilmes] = useState([]);
  const divRef = useRef(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const [qtdeImg, setQtdeImg] = useState(6);
  const [vw50, setVw50] = useState(0);

  useEffect(() => {
    const imgResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 500) {
        setQtdeImg(2);
      } else if (screenWidth < 800) {
        setQtdeImg(3);
      } else if (screenWidth < 1100) {
        setQtdeImg(4);
      } else if (screenWidth < 1400) {
        setQtdeImg(5);
      } else {
        setQtdeImg(6);
      }
      setVw50(screenWidth * 0.005);

      setWindowSize(window.innerWidth);
    };

    imgResize();

    window.addEventListener('resize', imgResize);
    return () => {
      window.removeEventListener('resize', imgResize);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async (_path) => {
      try {
        const data = await getMovies(_path);
        setFilmes(data?.results);
      } catch (error) {
        console.log("fetchMovies error: ", error);
      }
    };

    fetchMovies(path);
  }, [path]);

  const handleScroll = (scrollOffset) => {
    if (divRef.current) {
      divRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="filme-card" ref={divRef}>
        {filmes?.map(filme => (
          <div key={filme.id}>
            <img
              style={{ width: `${windowSize / qtdeImg}px` }}
              src={`${urlImage}${filme.backdrop_path || filme.poster_path}`}
              alt={filme.name}
            />
          </div>
        ))}

      </div>
      <button className="arrow-btn btn-left" onClick={() => handleScroll(-windowSize)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </button>
      <button className="arrow-btn btn-right" onClick={() => handleScroll(windowSize + vw50 * qtdeImg)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>
    </div>
  );
}

export default Lista;
