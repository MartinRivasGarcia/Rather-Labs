import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom"
import { options, queries, url, urlShows } from '../modules/constants';

function Home() {
    const [shows, setShows] = useState([]);
    const [totalShows, setTotalShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [totalMovies, setTotalMovies] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {


        fetch(urlShows, options)
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

        const value = window.localStorage.getItem("user");
        if (value) {
            Axios.get('http://localhost:3001/favorites', {
                params: {
                    user: value
                }
            }).then(function (res) {
                for (let i = 0; i < res.data.data.length; i++) {
                    const element = res.data.data[i];
                    let idDom = ""
                    if (element.type == "tv") {
                        idDom += "Tstar" + element.id
                    } else {
                        idDom += "Mstar" + element.id
                    }
                    console.log(idDom)
                    document.getElementById(idDom).setAttribute("class", "bi bi-star star active")
                }
            })
                .catch(function (error) {

                })
        }
    }, [])

    const handleClickTv = (event) => {
        console.log(event.target)
        console.log(event.target.id)

        navigate('/detail/' + event.target.id + '/TV')
    }
    const handleClickMovie = (event) => {
        console.log(event.target)
        console.log(event.target.id)

        navigate('/detail/' + event.target.id + '/Movie')
    }

    const searchFilms = (event) => {
        let userEntry = event.target.value;
        let searchMovies = []

        if (userEntry.length === 0) {
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

    const handleClickStar = (event) => {
        var star = event.target;
        var id = star.id.substring(5)
        var type = star.id.substring(0, 1)
        if (type == "T") {
            type = "tv"
        } else {
            type = "movie"
        }
        const value = window.localStorage.getItem("user");
        if (value) {
            if (star.className.baseVal === "bi bi-star star active") {
                Axios.delete('http://localhost:3001/favorites', {
                    data: {
                        user: value,
                        id: id,
                        type: type
                    }
                }).then(function (res) {
                    star.setAttribute("class", "bi bi-star")
                })
                    .catch(function (error) {
                        alert("Cant remove from favorites")
                    })
            } else {
                Axios.post('http://localhost:3001/favorites', {
                    user: value,
                    id: id,
                    type: type
                }).then(function (res) {
                    star.setAttribute("class", "bi bi-star star active")
                })
                    .catch(function (error) {
                        alert("Cant add to favorites")
                    })
            }
        } else {
            alert("Sing in to add favorites")
        }
    }

    const searchTvShows = (event) => {
        let userEntry = event.target.value;
        let searchShows = []

        if (userEntry.length === 0) {
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

            <div className="container">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {shows.map((item, index) => (
                        <div className="col-sm-6 mb-3 mb-sm-0" key={item.id}>

                            <div id={item.id} key={item.name} className="card border-dark mb-3">
                                <img onClick={handleClickTv} src={"https://image.tmdb.org/t/p/original/" + item.backdrop_path} id={item.id} className="card-img-top"></img>
                                <div className="card-body">
                                    <h5 className="card-title text-center">{item.name}</h5>
                                    <div className="row">
                                        <div className="card-text">
                                            <p className="text-end"> {item.first_air_date}  <svg id={"Tstar" + item.id} onClick={handleClickStar} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor yellow" style={{ backgroundcolor: "yellow" }} className="bi bi-star" viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg> {item.vote_average} </p>
                                        </div>
                                    </div>
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

            < div className="container" >
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {movies.map((item, index) => (
                        <div className="col-sm-6 mb-3 mb-sm-0">

                            <div key={item.title} className="card border-dark mb-3">
                                <img onClick={handleClickMovie} id={item.id} src={"https://image.tmdb.org/t/p/original/" + item.backdrop_path} className="card-img-top"></img>
                                <div className="card-body">
                                    <h5 className="card-title text-center">{item.title}</h5>
                                    <div className="row">
                                        <div className="card-text">
                                            <p className="text-end"> {item.release_date}  <svg id={"Mstar" + item.id} onClick={handleClickStar} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor yellow" style={{ backgroundcolor: "yellow" }} name="Movie" className="bi bi-star" viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg> {item.vote_average} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
}


export default Home


