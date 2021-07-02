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
 


    const image = currentFilm?.film?.img || '../img/placeholderpng.png';

    const dispatch = useDispatch();

    const comments = currentFilm?.comments?.map(el => {
        return <Comment  comment={el}/>
    })
   
    

    useEffect(()=> {
        
        dispatch(fetchCurrentFilm(title));
        if (userid) {
            dispatch(fetchFilmRatingUser(title,userid))
            
        }
        
  
        
       
    },[]);

    const rating = useSelector(state=>state.currentRating);
    
    const ratingElement = <Rating title={title} value={rating} userid={userid}/>

    
    const addToFavouritesHandler = ()=> {
        dispatch(fetchAddToFavourites(userid,currentFilm.film.title));
    }


    return (
        <div className="currentFilm">

        
        <h1 className="currentFilm__title">{currentFilm?.film?.title}</h1>
        <img className="currentFilm__img" src={image} width="250px" height="250px" alt="" />
        <p className="currentFilm__desc">{currentFilm?.film?.description  }</p>
        
        {userid ? <><button className="btn currentFilm__btn" onClick={addToFavouritesHandler}>Add to Favourites</button></> :<></> }
        {userid ?ratingElement :<></>}
        
        <div className="comments">
            <h2>Comments</h2>
            {comments}
        </div>
        {userid ? <CommentForm userid={userid}  title={title} /> : <></>}
        </div>
    )
}


export default Film