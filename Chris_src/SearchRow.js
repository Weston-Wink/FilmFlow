import React, {useState, useEffect} from 'react';
import axios from './axios';
import './Row.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const base_url = "https://image.tmdb.org/t/p/original/";

var movie_id = -1;
var movie_description = "";
var movie_name = "";
var movie_poster = "";
const API_IMG = "https://image.tmdb.org/t/p/w200";

var result;
function test(id){
    result = id;

    var email = localStorage.getItem("email");         //retrieve the email from local storage
    var password = localStorage.getItem("password");   //retrieve the password from local storage
    var movID=id;
    console.log(email,password,movID);

    fetch("http://localhost:5000/login",{
        method: "POST",
        crossDomain: true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            email,
            password,
            movID,
        }),
    }).then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userRegister");
        })
};

function SearchRow({title, fetchUrl, isLargeRow}){
    const[movies, setMovies] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(()=>{

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    console.log(movies);
   
    return (
        <div className="row">
            <div className = "category-header">
            </div>
            
            <div className="row__posters">
                {movies.map((movie,index)=>(
                    <><img className={`row__poster  ${isLargeRow && "row__posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick = { () =>   {
                            movie_id = movie.id;
                            movie_name = movie.title;
                            movie_description = movie.overview;
                            movie_poster = (API_IMG) + (movie.poster_path);
                            setShow(true);
                    }}
                        >
                        </img>
                        </>
                        
                ))}
            </div>

            <Modal className = "movie_popup" show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title> <b>{movie_name}</b> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img classNme = "img-fluid" src = {movie_poster}></img>
                    <p>
                        <b> Synopsis: </b> {movie_description}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Dislike
                    </Button>
                    <Button variant="info" onClick={handleClose}>
                        Like
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SearchRow