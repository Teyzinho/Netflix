const API_KEY = "77b9cfe55f3ede87a7c4f4c7e6b32c25";

const categorias = [
    {
        name: "emAlta",
        title: "Em Alta",
        path: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=pt-BR`
    },
    {
        name: "lancando",
        title: "Lançando",
        path: `https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1&api_key=${API_KEY}`
    },
    {
        name: "maisVotados",
        title: "Mais Votados",
        path: `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&api_key=${API_KEY}`
    },
    {
        name: "series",
        title: "Séries",
        path: `https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1&api_key=${API_KEY}`
    },
    {
        name: "comedia",
        title: "Comédia",
        path: `https://api.themoviedb.org/3/discover/movie?language=pt-BR&page=1&sort_by=popularity.desc&with_genres=35&api_key=${API_KEY}`
    },
    {
        name: "romance",
        title: "Romances",
        path: `https://api.themoviedb.org/3/discover/tv?language=pt-BR&page=1&sort_by=popularity.desc&with_genres=10749&api_key=${API_KEY}`
    },
    {
        name: "documentarios",
        title: "Comédia",
        path: `https://api.themoviedb.org/3/discover/tv?language=pt-BR&page=1&sort_by=popularity.desc&with_genres=99&api_key=${API_KEY}`
    },
]

export const getMovies = async (path) => {
    try {
        let url = `https://api.themoviedb.org/3/${path}`;
        const resposta = await fetch(url);
        return await resposta.json();
    } catch (error) {
        console.log("error getMovies", error);
    }
}


