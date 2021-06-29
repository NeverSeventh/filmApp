import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchAddToFavourites, fetchCurrentFilm,fetchFilmRatingUser } from "../../redux/AC/films";
import Comment from "../Comment/Comment";
import Rating from '../Rating/Rating'
import CommentForm from "../CommentForm/CommentForm";
import "./film.scss"

const Film = () => {
    let {title} = useParams();
    const currentFilm = useSelector(state=> state.currentFilm);
    const userid = useSelector(state=>state.userid);



    

    const dispatch = useDispatch();

    const comments = currentFilm?.comments?.map(el => {
        return <Comment  comment={el}/>
    })
    console.log(currentFilm.comments);
    

    useEffect(()=> {
        
        dispatch(fetchCurrentFilm(title));
        //dispatch(fetchFilmRatingUser(title,userid))
  
        
       
    },[]);

    
    

    
    const addToFavouritesHandler = ()=> {
        dispatch(fetchAddToFavourites(userid,currentFilm.film.title));
    }
    
   

    return (
        <>

        
        <h1>{currentFilm?.film?.title}</h1>
        <p>{currentFilm?.film?.description  }</p>
        {userid ? <><button onClick={addToFavouritesHandler}>Add to Favourites</button></> :<></> }
        {userid ? <Rating title={title} value={currentFilm.currentRating} userid={userid}/> :<></>}
        
        <div className="comments">
            {comments}
        </div>
        {userid ? <CommentForm userid={userid}  title={title} /> : <></>}
        </>
    )
}


export default Film