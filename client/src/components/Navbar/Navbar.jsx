import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";




const Navbar = () => {
    const userid = useSelector(state=>state.userid)

    return(
        <div className="navbar" style={{display:'flex'}}>
            <NavLink to="/user">User</NavLink>
            <NavLink to="/film">film</NavLink>
            {userid ? <></>          :
            <>
                <NavLink to="/login">login</NavLink>
            <NavLink to="/signup">signup</NavLink>
            </>
            
             }

        </div>
    )
}

export default Navbar;