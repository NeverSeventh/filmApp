import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { redirectActionCreator } from "../../redux/AC/redirect";
import { fetchCurrentUser } from "../../redux/AC/users";
import Logout from "../Logout/Logout";
import "./navbar.scss"



const Navbar = () => {
    const userid = useSelector(state=>state.currentUser.user?.id);
    const redirect = useSelector(state=>state.redirect);
    const role = useSelector(state=>state.currentUser.user?.role);
    const history =useHistory();
    const dispatch = useDispatch();

    let isAdmin;

    if (role === 'admin') {
        isAdmin=true;
    }
    if (redirect) {
        history.push(redirect);
        dispatch(redirectActionCreator(''));
    }
    
    useEffect(()=> {
        if (localStorage.getItem('token') && !userid) {
            dispatch(fetchCurrentUser());
        }   
        if (redirect) {
 
        }
        
    },[]);

    return(
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                <NavLink to="/user">User</NavLink>
                </li>
                <li className="navbar__item">
                <NavLink to="/film">film</NavLink>
                </li>
                {userid ? <>
                    <li className="navbar__item">
                    <Logout/>
                    </li></>
                    :
                    <>
                    <li className="navbar__item">
                        <NavLink to="/login">login</NavLink>
                    </li>
                    
                    <li className="navbar__item">
                    <NavLink to="/signup">signup</NavLink>
                    </li>

                   
            </>
            
             }
             {isAdmin ? <li className="navbar__item"><NavLink to="/admin">admin</NavLink></li> :<></>}
            </ul>
            
           


        </nav>
    )
}

export default Navbar;