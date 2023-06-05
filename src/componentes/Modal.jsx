import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import './Modal.css'
const urlImage = "https://image.tmdb.org/t/p/original";
import movieTrailer from "movie-trailer";
import axios from 'axios';

function Modal({ isOpen, onClose, filme }) {

    //Verificar se a Modal está aberta
    if (!isOpen) {
        return null;
    }

    //Função transformar datas inteiras em anos
    const date = new Date(filme.release_date || filme.first_air_date);
    const year = date.getFullYear();

    // Váriaveis função Api Youtube e  
    const [trailerUrl, setTrailerUrl] = useState("");
    const [videoId, setVideoId] = useState("");
    // //Função que procura Video no youtube
    const movieOnclick = async (filme) => {
        openTrailer();
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params: {
                        part: 'snippet',
                        q: filme.title || filme.name || filme.original_name + ' Oficial Trailer',
                        maxResults: 1,
                        key: 'AIzaSyDmTgCG7IRkP6_NnLhPmL68cVn1DdPaLLk',
                    },
                }
            );

            if (response.data.items.length > 0) {
                const videoId = response.data.items[0].id.videoId;
                setVideoId(videoId);
                console.log("videoId:", videoId)
            } else {
                console.log('Nenhum vídeo encontrado.');
            }
        } catch (error) {
            console.error("Video Error", error);
            console.log("videoId:", videoId)

        }

    };

    //Funççao que utiliza Movie trailer
    // const movieOnclick = (filme) => {
    //     openTrailer();
    //     movieTrailer(filme.title || filme.name || filme.original_name, "")
    //         .then(url => setVideoId(url))
    //         .catch((error) => {
    //             console.log("Error movie trailer: ", error);
    //         });
    // }


    //Função que abre o video
    const [trailerOpen, setTrailerOpen] = useState(false)

    const openTrailer = () => {
        setTrailerOpen(true)
    }
    const closeTrailer = () => {
        setTrailerOpen(false)
    }

    return (
        <div >
            <div className="modal-container" >
                <div className="modal">
                    <div className="modal-header">
                        <button className="close-btn" onClick={onClose}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="close" tabIndex="0">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor"></path>
                            </svg>
                        </button>
                        <img
                            className="banner-filme"
                            src={`${urlImage}${filme.backdrop_path}`}
                            alt="Banner Filme"
                        />
                        <div className="header-content">
                            <h1 className="title">
                                {filme?.title || filme?.name || filme?.original_name}
                            </h1>
                            <div className="btns">
                                <button onClick={() => movieOnclick(filme)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="Play"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                                    Assistir Trailer
                                </button>
                            </div>
                        </div>
                        <div className="modal-header-gradient">
                        </div>
                    </div>
                    <div className="modal-body">
                        <span className="voteAvg">
                            {Math.round((filme.vote_average / 10) * 100) + "% - revelante"}
                        </span>
                        <span className="year">
                            {year}
                        </span>
                        <p className="desc">
                            {filme.overview}
                        </p>
                    </div>
                </div>
            </div>
            {/* If tralerOpen == "true" */}
            {trailerOpen && (
                <div className="trailer-video">
                    <button className="trailer-voltar-btn" onClick={closeTrailer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </button>
                    <span className="trailer-desc">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                        O Video questão é gerado através da API do youtube e pode não ser um trailer!
                    </span>
                    <div className="ReactPlayer">
                        {videoId ? <ReactPlayer playing={true}
                            width="100%" 
                            height="100%" 
                            url={`https://www.youtube.com/embed/${videoId}`} />
                            : <span>Video Não Encontrado</span>}

                        {/* <ReactPlayer width="85%" height="85%" url={`https://www.youtube.com/watch?v=7g0fZZHG_8I&pp=ygUbcmFwIGRvIGpvam8gc2hpZ2VraXlvIHlhbmd1`} /> */}
                    </div>

                </div>
            )}



        </div>

    )
}

export default Modal;