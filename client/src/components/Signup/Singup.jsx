import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignup } from "../../redux/AC/users";




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

        <form onSubmit={signUpHandler}>
            <input type="text" name="nickname" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button type="submit">Зарегистрироваться</button>
        </form>
    )
}


export default Signup;