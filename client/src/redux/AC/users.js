import { CURRENT_USER, IS_ADMIN, LOGIN, LOGOUT, SIGNUP, } from "../types"
import { errorActionCreator, noErrorActionCreator } from "./error"



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
        dispatch(isAdminActionCreator(userInfo.isAdmin));
        dispatch(fetchCurrentUser());
        dispatch(noErrorActionCreator());
    }else 
    if (responce.status ===401) {
        const errorMesg = await responce.json();
        dispatch(errorActionCreator(errorMesg));
    }
    


}

const currentUserActionCreator = (payload) => {
    return {type:CURRENT_USER, payload:payload}
}





const fetchCurrentUser = () => async(dispatch,getState) => {
   const responce = await fetch('http://localhost:6970/user',{
    method: 'GET',
    headers: {'Content-Type': 'application/json;charset=utf-8',
    "Authorization": `${localStorage.getItem('token')}`},
   });
   
   if (responce.status === 200) {
    const user = await responce.json(); 
    dispatch(currentUserActionCreator(user));
    dispatch(noErrorActionCreator());
    
   }else 
   if (responce.status === 401) {
       dispatch(errorActionCreator('UserError'))
       localStorage.removeItem('token');
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
        dispatch(fetchCurrentUser());
        dispatch(isAdminActionCreator(data.isAdmin));
        dispatch(noErrorActionCreator())
    }else 
    if (responce.status ===401) {
        const errorMesg = await responce.json()
        dispatch(errorActionCreator(errorMesg))
    }
    

}

const logoutActionCreator = (payload) => {
    localStorage.removeItem('token');
    return {type:LOGOUT,payload:payload}
}



export {fetchLogin, fetchCurrentUser,fetchSignup,logoutActionCreator}