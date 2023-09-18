import React, { useEffect, useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom"

const apiUrl = require('../modules/constants').apiUrl;
const queries = require('../modules/constants').queries;

const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTBlNzgyNTQ4NjU4NGM3ZTI0Njc5YWFjYjM1MmJhMyIsInN1YiI6IjY0ZmUxZGQ1ZmE0MDQ2MDBlMTdlODA3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WweAe8qnOQUW_jWsn9B8cswZbxukEXaWwz10AXlhAv8'
    }
};

const urlShows = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
const optionsShows = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTBlNzgyNTQ4NjU4NGM3ZTI0Njc5YWFjYjM1MmJhMyIsInN1YiI6IjY0ZmUxZGQ1ZmE0MDQ2MDBlMTdlODA3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WweAe8qnOQUW_jWsn9B8cswZbxukEXaWwz10AXlhAv8'
    }
};


function NewListGroup() {

    const [shows, setShows] = useState([]);
    const [totalShows, setTotalShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [totalMovies, setTotalMovies] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        /*Axios.get("http://localhost:3001/api/classes").then((response) => {
            setClasses(response.data)
        });*/


        /*Axios.post(apiUrl, {
            query: queries.getClients
        }).then((res) => {
            console.log(res.data.data)
            console.log(res.data.data.clients)
            setClasses(res.data.data.clients)
        })
            .catch((error) => {
                console.error(error)
            });*/

        fetch(urlShows, optionsShows)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                console.log(json.results)
                setTotalShows(json.results)
                setShows(json.results)
            })
            .catch(err => console.error('error:' + err));


        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                console.log(json.results)
                setTotalMovies(json.results)
                setMovies(json.results)
            })
            .catch(err => console.error('error:' + err));


    }, [])

    const handleClickTv = (event) => {
        console.log(event.target)
        console.log(event.target.id)
        
        navigate('/detail/' + event.target.id + '/TV')
        //navigate('/list')
    }
    const handleClickMovie = (event) => {
        console.log(event.target)
        console.log(event.target.id)
        
        navigate('/detail/' + event.target.id + '/Movie')
        //navigate('/list')
    }

    const searchFilms = (event) => {
        let userEntry = event.target.value;
        let searchMovies = []

        if (userEntry.length == 0) {
            setMovies(totalMovies)
        } else {
            for (let i = 0; i < totalMovies.length; i++) {
                const element = totalMovies[i];
                if (element.title.toUpperCase().includes(userEntry.toUpperCase())) {
                    searchMovies.push(element)
                }
            }
            setMovies(searchMovies)
        }
    }

    const searchTvShows = (event) => {
        let userEntry = event.target.value;
        let searchShows = []

        if (userEntry.length == 0) {
            setShows(totalShows)
        } else {
            for (let i = 0; i < totalShows.length; i++) {
                const element = totalShows[i];
                if (element.name.toUpperCase().includes(userEntry.toUpperCase())) {
                    searchShows.push(element)
                }
            }
            setShows(searchShows)
        }
    }

    return (
        <>
            <h1>TV Shows</h1>
            <div className="container">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" id="searchFilm" onChange={searchTvShows} aria-label="Search" />
                </form>
            </div>

            <br></br>

            {shows.length === 0 && <p>No shows found</p>}

            <div className="container text-center">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {shows.map((item, index) => (
                        <div className="col-sm-6 mb-3 mb-sm-0" key={item.id}>

                        <div id={item.id} key={item.name} className="card border-dark mb-3">
                            <img onClick={handleClickTv} src={"https://image.tmdb.org/t/p/original/" + item.backdrop_path} id={item.id} className="card-img-top"></img>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text"><small className="text-muted">{item.first_air_date}</small></p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <h1>Movies</h1>
            <div className="container">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" id="searchFilm" onChange={searchFilms} aria-label="Search" />
                </form>
            </div>

            <br></br>

            {movies.length === 0 && <p>No movies found</p>}

            <div className="container">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {movies.map((item, index) => (
                        <div className="col-sm-6 mb-3 mb-sm-0">

                            <div key={item.title} className="card border-dark mb-3">
                                <img onClick={handleClickMovie} id={item.id} src={"https://image.tmdb.org/t/p/original/" + item.backdrop_path} className="card-img-top"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text"><small className="text-muted">{item.release_date}</small></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
}


export default NewListGroup


