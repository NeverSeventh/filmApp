import { useDispatch } from "react-redux";
import { logoutActionCreator } from "../../redux/AC/users";
import './logout.scss';



const Logout = () => {
    const dispatch = useDispatch();

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logoutActionCreator())
    }

    return (
        <div className="logout__btn" onClick={logoutHandler}>Logout</div>
    )
}


export default Logout;