import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchCurrentFilm } from "../../redux/AC/films";



const Film = () => {
    let {title} = useParams();
    const currentFilm = useSelector(state=> state.currentFilm);

    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(fetchCurrentFilm(title));
        
    },[])
    
    

    return (
        <>
        
        <h1>{currentFilm?.film?.title}</h1>
        <p>{currentFilm?.film?.description  }</p>


        <div className="comments">
            
        </div>
        </>
    )
}


export default Film