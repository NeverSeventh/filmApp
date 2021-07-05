import { useEffect, useState } from 'react';
import ReactStarts from 'react-rating-stars-component';
import { useDispatch, useSelector} from "react-redux";

import { fetchFilmRatingUser, fetchRateFilm } from '../../redux/AC/films';
const Rating = ({value,title,userid}) => {

    const dispatch = useDispatch();
    
    const [ratingElement,setRatingElement] = useState('');
    

    const ratingChanged = (newRating) => {
        dispatch(fetchRateFilm(title,userid,newRating));
    }
    useEffect(()=> {
        const fetchRating = async() => {
            const responce = await fetch(`http://localhost:6970/film/${title}/rating`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `${localStorage.getItem('token')}`},
                body:JSON.stringify({userid:userid,title:title})
               });
               
            if (responce.status === 200) {
                const rating = await responce.json();
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


    // const currentRatingHandler = (e) => {
    //     updateCurrentRating(()=> e)
    // }
    
    return(

    <>
        {ratingElement}

    </>
    )
}


export default Rating;