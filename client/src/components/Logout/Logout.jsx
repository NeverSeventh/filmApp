import { useDispatch } from "react-redux";
import { logoutActionCreator } from "../../redux/AC/users";




const Logout = () => {
    const dispatch = useDispatch()
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logoutActionCreator())
    }

    return (
        <button onClick={logoutHandler}>Logout</button>
    )
}


export default Logout;