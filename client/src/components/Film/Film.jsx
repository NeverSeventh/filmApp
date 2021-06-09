import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchCurrentFilm } from "../../redux/AC/films";
import Comment from "../Comment/Comment";



const Film = () => {
    let {title} = useParams();
    const currentFilm = useSelector(state=> state.currentFilm);

    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(fetchCurrentFilm(title));
        
    },[])

    
    
    const comments = currentFilm?.comments?.map(el => {
        return <Comment key={el.id} text={el.text}/>
    })

    return (
        <>
        
        <h1>{currentFilm?.film?.title}</h1>
        <p>{currentFilm?.film?.description  }</p>


        <div className="comments">
            {comments}
        </div>
        </>
    )
}


export default Film