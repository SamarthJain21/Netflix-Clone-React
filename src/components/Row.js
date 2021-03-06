import React , {useState , useEffect} from 'react';
import axios from '../axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'
const baseURL = "https://image.tmdb.org/t/p/original/";


function Row({title , fetchUrl ,isLargeRow}){
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(()=>{
    //run once when row loads since we have kept [] empty

    async function fetchData(){
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return;
    }
    fetchData();
  },[fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick= (movie)=>{
    if(trailerUrl){
      setTrailerUrl('');
    }else{
      movieTrailer(movie?.title ||movie?.name ||movie?.original_name || "").then((url)=>{
         //https://www.youtube.com/watch?v=fffjjfjfjfjf
        //v represents video id
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      }).catch((error)=>console.log(error))
    }
  }


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* all the row posters */}
          {movies.map((movie) => (
          <img
          className={`row_poster ${isLargeRow && "row_poster_large"}`}
          key={movie.id}
          onClick={()=> handleClick(movie)}
          src={`${baseURL}${isLargeRow? movie.poster_path : movie.backdrop_path}`}
          alt={movie.name}/>

        ))}
      </div>
      {trailerUrl &&<Youtube videoId={trailerUrl} opts = {opts}/>}
    </div>

  );
}

export default Row
