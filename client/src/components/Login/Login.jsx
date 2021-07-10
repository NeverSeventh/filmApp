import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchLogin } from "../../redux/AC/users";
import './login.scss';

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const error = useSelector(state=> state.errorMesg);
    const {user} = useSelector(state=>state.currentUser);
    const loginHandler = (e) => {
        e.preventDefault();
         dispatch(fetchLogin(e.target.email.value,e.target.password.value))
    }

    if (user) {
        history.push('/user');
    }


    return (
        <>
        {error ? <><div className="error__message">{error}</div></>:<></>}
        <form className="login"  onSubmit={loginHandler}>
            <div className="login__item">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="login__item">
                <label htmlFor="password">Пароль</label>
                <input type="password" name="password" id="password" />
            </div>
            
            
            <button type="submit" className="btn">Войти</button>
        </form>
        
        </>
    )
}


export default Login;