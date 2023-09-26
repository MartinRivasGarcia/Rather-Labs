import Axios from "axios";
import { useEffect, useState } from "react";
import { options, queries, url, urlShows } from '../modules/constants';
import { createRoutesFromChildren, useNavigate } from "react-router-dom";

function ProfilePage() {
    const [shows, setShows] = useState([]);
    const [totalShows, setTotalShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [totalMovies, setTotalMovies] = useState([]);
    const [favorites, setFavorites] = useState([])
    const [user, setUser] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const value = window.localStorage.getItem("user");
        Axios.get('http://localhost:3001/user', {
            params: {
                user: value
            }
        }).then(function (res) {
            console.log(res.data.data)
            setUser(res.data.data[0].FirstName)
        })
            .catch(function (error) {

            })

        fetch(urlShows, options)
            .then(res => res.json())
            .then(json => {
                setTotalShows(json.results)
                setShows(json.results)
            })
            .catch(err => console.error('error:' + err));


        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setTotalMovies(json.results)
                setMovies(json.results)
            })
            .catch(err => console.error('error:' + err));

        Axios.get('http://localhost:3001/favorites', {
            params: {
                user: value
            }
        }).then(function (res) {
            console.log(res.data.data)
            setFavorites(res.data.data)
        })
            .catch(function (error) {

            })


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

    }

    return <>
        <h1>{user}'s Favorites</h1>

        <div className="container">
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                {shows.map((item, index) => (
                    favorites.map((fav, i) => (
                        fav.id === item.id && fav.type == "tv" && (
                            <div className="col-sm-6 mb-3 mb-sm-0" key={item.id}>

                                <div id={item.id} key={item.name} className="card border-dark mb-3">
                                    <img onClick={handleClickTv} src={"https://image.tmdb.org/t/p/original/" + item.backdrop_path} id={item.id} className="card-img-top"></img>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{item.name}</h5>
                                        <div className="row">
                                            <div className="card-text">
                                                <p className="text-end"> {item.first_air_date}  <svg id={"Tstar" + item.id} onClick={handleClickStar} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor yellow" style={{ backgroundcolor: "yellow" }} className="bi bi-star star active" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg> {item.vote_average} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))
                ))}
            </div>
        </div>

        < div className="container" >
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">

                {movies.map((item, index) => (
                    favorites.map((fav, i) => (
                        fav.id === item.id && fav.type == "movie" && (
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div key={item.title} className="card border-dark mb-3">
                                    <img onClick={handleClickMovie} id={item.id} src={"https://image.tmdb.org/t/p/original/" + item.backdrop_path} className="card-img-top"></img>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{item.title}</h5>
                                        <div className="row">
                                            <div className="card-text">
                                                <p className="text-end"> {item.release_date}  <svg id={"Mstar" + item.id} onClick={handleClickStar} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor yellow" style={{ backgroundcolor: "yellow" }} name="Movie" className="bi bi-star star active" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg> {item.vote_average} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))
                ))}
            </div>
        </div>

    </>
}

export default ProfilePage;