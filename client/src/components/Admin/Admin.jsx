import { NavLink } from "react-router-dom";




const Admin = () => {
    return (
        <ul>
            <li><NavLink to="/admin/films">Edit</NavLink></li>
            <li><NavLink to="/admin/add">Add</NavLink></li>
            <li><NavLink to="/admin/delete">Delete</NavLink></li>
        </ul>
    )
}


export default Admin;