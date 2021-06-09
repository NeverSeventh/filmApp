import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCurrentUser } from "../../redux/AC/users";

const User = () => {

    const dispatch =useDispatch();

    const user = useSelector(state=>state.currentUser);
    const userid = useSelector(state=>state.userid);
    useEffect(()=> {
        dispatch(fetchCurrentUser(userid));
    },[])

    console.log(user);

    const filmlist = user?.favFilms?.map(el=>{
        return <li> <NavLink  to={"/film/"+el.filmsLink}>{el.title}</NavLink></li>
    })

    return(
        <>
        <ul>{filmlist}</ul>
        
        </>
    )
}


export default User;