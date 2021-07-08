import { CURRENT_USER, ERROR, IS_ADMIN, LOGIN, LOGOUT, NO_ERROR, SIGNUP, TOKEN } from "../types"



const loginActionCreator = (payload) => {
    return {type:LOGIN, payload:payload}
}

const isAdminActionCreator = (payload) => {
    return {type:IS_ADMIN,payload:payload}
}



const fetchLogin = (email, password) => async(dispatch,getState) => {
    const responce = await fetch("http://localhost:6970/user/signin",{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify({email:email, password:password})
    });
    
    if (responce.status === 200) {
        const userInfo = await responce.json();
        localStorage.setItem('token',`${userInfo.token}`);
        dispatch(loginActionCreator(userInfo.userid));
        dispatch(isAdminActionCreator(userInfo.isAdmin));
    }
    


}

const currentUserActionCreator = (payload) => {
    return {type:CURRENT_USER, payload:payload}
}

const fetchCurrentUser = () => async(dispatch,getState) => {
   const responce = await fetch('http://localhost:6970/user',{
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',
    "Authorization": `${localStorage.getItem('token')}`},
   });
   if (responce.status === 200) {
    const user = await responce.json(); 
    dispatch(currentUserActionCreator(user));
    dispatch({type:NO_ERROR})
   }else 
   if (responce.status === 401) {
       dispatch({type:ERROR,payload:'Please login or signup'})
   }

}

const signupActionCreator = (payload) => {
    return {type:SIGNUP, payload:payload}
}

const fetchSignup = (nickname,email,password) => async(dispatch,getState) => {
    const responce = await fetch("http://localhost:6970/user/signup",{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify({email:email, password:password,nickname:nickname})
    });
    if (responce.status === 200) {
        const data = await responce.json();
        localStorage.setItem('token',`${data.token}`);
        dispatch(signupActionCreator(data.userid));
        dispatch(isAdminActionCreator(data.isAdmin));
    }

}

const logoutActionCreator = (payload) => {
    localStorage.removeItem('token');
    return {type:LOGOUT,payload:payload}
}



export {fetchLogin, fetchCurrentUser,fetchSignup,logoutActionCreator}