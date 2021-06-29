import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./navbar.scss"



const Navbar = () => {
    const userid = useSelector(state=>state.userid)

    return(
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                <NavLink to="/user">User</NavLink>
                </li>
                <li className="navbar__item">
                <NavLink to="/film">film</NavLink>
                </li>
                {userid ? <></>          :
                    <>
                    <li className="navbar__item">
                        <NavLink to="/login">login</NavLink>
                    </li>
                    
                    <li className="navbar__item">
                    <NavLink to="/signup">signup</NavLink>
                    </li>
                   
            </>
            
             }
            </ul>
            
           


        </nav>
    )
}

export default Navbar;