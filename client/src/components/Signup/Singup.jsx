import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignup } from "../../redux/AC/users";
import './signup.scss'



const Signup = () => {

    const dispatch = useDispatch();


    const message = useSelector(state=>state.signup);

    const signUpHandler = (e)=> {
        e.preventDefault();
        dispatch(fetchSignup(e.target.nickname.value,e.target.email.value,e.target.password.value));
    }

    useEffect(()=> {
        
    },[]);

   

    return(

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
    )
}


export default Signup;