import { useEffect, useState } from 'react';
import ReactStarts from 'react-rating-stars-component';
import { useDispatch} from "react-redux";

import {fetchRateFilm } from '../../redux/AC/films';
const Rating = ({title}) => {

    const dispatch = useDispatch();
    
    const [ratingElement,setRatingElement] = useState('');
    

    const ratingChanged = (newRating) => {
        dispatch(fetchRateFilm(title,newRating));
    }
    useEffect(()=> {
        const fetchRating = async() => {
            const responce = await fetch(`https://filmappserver.herokuapp.com/film/${title}/rating`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `${localStorage.getItem('token')}`},
                body:JSON.stringify({title:title})
               });
               
            if (responce.status === 200) {
                let rating = await responce.json();
                
                setRatingElement(<ReactStarts
                    value={rating}
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                
                />)
            }

        }
        if (localStorage.getItem('token')) {
            fetchRating();
        }
        
    },[])


    
    return(

    <>
        {ratingElement}

    </>
    )
}


export default Rating;