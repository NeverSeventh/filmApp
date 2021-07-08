import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCurrentUser } from "../../redux/AC/users";
import UserFilm from "./UserFilm/UserFilm";
const User = () => {

    const dispatch =useDispatch();

    const user = useSelector(state=>state.currentUser);
    const userid = useSelector(state=>state.userid);
    
    useEffect(()=> {
        if (localStorage.getItem('token')) {
            dispatch(fetchCurrentUser(userid));
        }
        
    },[])


    

    const filmlist = user?.favFilms?.map(el=>{
        return <li><UserFilm film={el} userid={userid}/></li>
    })

    return(
        <>
        <div className="user">
            {user ?
            <>
            <div className="user__name">{user.user?.nickname}</div>
            <div className="user__text">Ваши любимые фильмыЖ</div>
            </>
            :<></>}
        </div>
        <ul>{filmlist}</ul>
        
        </>
    )
}


export default User;