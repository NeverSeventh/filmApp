import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSignup } from "../../redux/AC/users";
import './signup.scss'



const Signup = () => {

    const dispatch = useDispatch();

    const history = useHistory();
    const error = useSelector(state=>state.errorMesg);
    const {user} = useSelector(state=>state.currentUser); 
    const signUpHandler = (e)=> {
        e.preventDefault();
        const {nickname,email,password} = e.target;
        dispatch(fetchSignup(nickname.value,email.value,password.value));
    }

    useEffect(()=> {
        
    },[]);

    if (user) {
        history.push('/user');
    }

    return(
        <>
        {error ?<><div className="error__message">{error}</div></>:<></>}
        <form onSubmit={signUpHandler} className="signup">
            <div className="signup__item">
            <label htmlFor="nickname">Ваш ник</label>
            <input type="text" name="nickname" />
            </div>
            <div className="signup__item">
            <label htmlFor="email">Ваш e-mail</label>
            <input type="email" name="email" />
            </div>
            <div className="signup__item">
            <label htmlFor="password">Пароль</label>
            <input type="password" name="password" />
            </div>


            <button className="signup__btn btn" type="submit">Зарегистрироваться</button>
        </form>
        </>
    )
}


export default Signup;