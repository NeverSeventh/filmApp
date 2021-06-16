import { useEffect, useState } from 'react';
import ReactStarts from 'react-rating-stars-component';
import { useDispatch, useSelector} from "react-redux";

import { fetchFilmRatingUser, fetchRateFilm } from '../../redux/AC/films';
const Rating = ({value,title,userid}) => {

    const dispatch = useDispatch();
   

    const ratingChanged = (newRating) => {
        dispatch(fetchRateFilm(title,userid,newRating));
    }


    // const currentRatingHandler = (e) => {
    //     updateCurrentRating(()=> e)
    // }

    return(


        <ReactStarts
        value={value}
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
    
    />
    )
}


export default Rating;