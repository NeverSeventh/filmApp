import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchAddToFavourites, fetchCurrentFilm,fetchFilmRatingUser } from "../../redux/AC/films";
import Comment from "../Comment/Comment";
import Rating from '../Rating/Rating'
import CommentForm from "../CommentForm/CommentForm";
import "./film.scss"
import { fetchDeleteFilm } from "../../redux/AC/admin";
import { fetchCurrentUser } from "../../redux/AC/users";
import FavouriteButton from "./FavouriteButton/FavouriteButton";
import { useHistory } from "react-router";
const Film = () => {
    let {title} = useParams();
    
    const currentFilm = useSelector(state=> state.currentFilm);
    const currentUser = useSelector(state=>state.currentUser);
    const {user} = currentUser;
    const history = useHistory();
    const isAdmin = useSelector(state=>state.isAdmin);
    const rating = useSelector(state=>state.currentRating);
    const {film} = currentFilm;
    
    
    const dispatch = useDispatch();

    const comments = currentFilm?.comments?.map(el => {
        return <Comment  comment={el}/>
    })
    

    
    

    useEffect(()=> {

        dispatch(fetchCurrentFilm(title));
        if (localStorage.getItem('token')) {
            dispatch(fetchCurrentUser());
        }
        
        if (user?.id) {
            dispatch(fetchFilmRatingUser(title))
            
        }

        
        
       
    },[]);

    
    
    
    const ratingElement = <Rating title={title} value={rating}/>

    
    const addToFavouritesHandler = ()=> {

        dispatch(fetchAddToFavourites(film.title));
        
        history.push('/user');
        
    }

    const deleteHandler = () => {
        dispatch(fetchDeleteFilm(film.id));
        history.push(`/film`)
    }

    

    

    return (
        <div className="currentFilm">

        
        <h1 className="currentFilm__title">{film?.title}</h1>
        <p className="currentFilm__desc">{film?.description}</p>
        
        {user?.id ? <><FavouriteButton addToFavourites={addToFavouritesHandler} inFavourites={film?.inFavourite}/></> :<></> }
        {user?.id ?ratingElement :<></>}
        {isAdmin ?<button  onClick={deleteHandler}>Удалить фильм</button> : <></>}
        <div className="comments">
            <h2>Comments</h2>
            {comments}
        </div>
        
        
        {user?.id ? <CommentForm title={title} /> : <></>}
        </div>
    )
}


export default Film