import { NavLink } from "react-router-dom";




const Navbar = () => {
    return(
        <div className="navbar" style={{display:'flex'}}>
            <NavLink to="/user">User</NavLink>
            <NavLink to="/film">film</NavLink>
            <NavLink to="/login">login</NavLink>
            <NavLink to="/signup">signup</NavLink>
        </div>
    )
}

export default Navbar;