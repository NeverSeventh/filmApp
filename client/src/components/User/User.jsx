import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { noErrorActionCreator } from "../../redux/AC/error";
import { fetchCurrentUser } from "../../redux/AC/users";
import UserFilm from "./UserFilm/UserFilm";

const User = () => {
    const history = useHistory();
    const dispatch =useDispatch();
    
    const currentUser = useSelector(state=>state.currentUser);
    
    const {user} = currentUser;

    const userError = useSelector(state=>state.errorMesg);
    
    useEffect(()=> {
        if (localStorage.getItem('token')) {
            dispatch(fetchCurrentUser());
        }

    },[])

    if (!localStorage.getItem('token')) {
       history.push('/login');
       
    }
    
    if (userError === 'UserError') {
        history.push('/login');
        dispatch(noErrorActionCreator());
    }

    const filmlist = currentUser?.favFilms?.map(el=>{
        return <li  key={el.id} ><UserFilm film={el}/></li>
    })

    return(
        <>
        <div className="user">
            {user ?
            <>
            <div className="user__name">{user?.nickname}</div>
            <div className="user__text">Ваши любимые фильмы</div>
            </>
            :<></>}
        </div>
        <ul>{filmlist}</ul>
        
        </>
    )
}


export default User;