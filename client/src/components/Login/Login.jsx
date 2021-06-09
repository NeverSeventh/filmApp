import { useDispatch } from "react-redux";
import { fetchLogin } from "../../redux/AC/users";


const Login = () => {

    const dispatch = useDispatch()

    const loginHandler = (e) => {
        e.preventDefault();
         dispatch(fetchLogin(e.target.email.value,e.target.password.value))
    }


    return (
        <>
        <form  onSubmit={loginHandler}>
            <input type="email" name="email" id="" />
            <input type="password" name="password" id="" />
            <button type="submit">Войти</button>
        </form>
        
        </>
    )
}


export default Login;