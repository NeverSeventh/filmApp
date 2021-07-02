import { useDispatch } from "react-redux";
import { fetchLogin } from "../../redux/AC/users";
import './login.scss';

const Login = () => {

    const dispatch = useDispatch()

    const loginHandler = (e) => {
        e.preventDefault();
         dispatch(fetchLogin(e.target.email.value,e.target.password.value))
    }


    return (
        <>
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