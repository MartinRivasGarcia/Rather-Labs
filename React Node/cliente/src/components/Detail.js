import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTBlNzgyNTQ4NjU4NGM3ZTI0Njc5YWFjYjM1MmJhMyIsInN1YiI6IjY0ZmUxZGQ1ZmE0MDQ2MDBlMTdlODA3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WweAe8qnOQUW_jWsn9B8cswZbxukEXaWwz10AXlhAv8'
    }
};

function Detail() {
    const [info, setInfo] = useState();
    const params = useParams()
    let url = ""

    useEffect(() => {
        if (params.type == "Movie") {
            url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
        } else {
            url = `https://api.themoviedb.org/3/tv/${params.id}?language=en-US`;
        }
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setInfo(json)
            })
            .catch(err => console.error('error:' + err));

    }, [])


    return (
        <>
            {info != undefined && <>
                <div className="container">
                    {info.name != undefined && <h1>{info.name}</h1>}
                    {info.original_title != undefined && <h1>{info.original_title}</h1>}
                    <h3>{params.type} - {info.first_air_date != undefined && info.first_air_date} {info.release_date != undefined && info.release_date}</h3>
                    <img src={"https://image.tmdb.org/t/p/original/" + info.backdrop_path} id={info.id} className="card-img-top"></img>
                    <p>{info.overview}</p>
                </div>

            </>
            }
        </>
    )
}

export default Detail;