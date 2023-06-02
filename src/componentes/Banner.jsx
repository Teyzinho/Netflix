import React, { useEffect, useState } from 'react';
import './Banner.css';
import categorias, { getMovies } from '../api';
const urlImage = "https://image.tmdb.org/t/p/original";
import logo from '../assets/Netflix_2015_logo.svg.png';

function Banner() {
    const [filme, setFilme] = useState({});

    const fetchFilmeAleatorio = async () => {
        try {
            const categoriaNetflix = categorias.find(
                (categoria) => categoria.name === 'netflixOriginals'
            );
            const data = await getMovies(categoriaNetflix.path);
            const dataResult = data?.results;
            const random = Math.floor(Math.random() * dataResult.length);
            setFilme(dataResult[random]);
        } catch (error) {
            console.log('fetchFilmeAleatorio Error:', error);
        }
    };

    useEffect(() => {
        fetchFilmeAleatorio();
    }, []);

    return <div className="banner-Container">
        <img
            className='imgbanner'
            src={`${urlImage}${filme.backdrop_path}`}
            alt="Banner"
        />
        <div className='banner-Content'>
            <div className='banner-desc'>
                <img src={logo} alt="" />
                {filme.overview}
                <div className='btn-desc'>
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-name="Play"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                        Assistir
                    </button>
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-name="Info"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>
                        Mais informações
                    </button>
                </div>
            </div>

        </div>
    </div>;
}

export default Banner;
