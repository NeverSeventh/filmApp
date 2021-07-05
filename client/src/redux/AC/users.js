import { CURRENT_USER, IS_ADMIN, LOGIN, SIGNUP, TOKEN } from "../types"



const loginActionCreator = (payload) => {
    return {type:LOGIN, payload:payload}
}

const isAdminActionCreator = (payload) => {
    return {type:IS_ADMIN,payload:payload}
}

const tokenActionCreator = (payload) => {
    return {type:TOKEN,payload:payload}
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
        dispatch(tokenActionCreator(userInfo.token))
        dispatch(loginActionCreator(userInfo.userid));
        dispatch(isAdminActionCreator(userInfo.isAdmin));
    }


}

const currentUserActionCreator = (payload) => {
    return {type:CURRENT_USER, payload:payload}
}

const fetchCurrentUser = (userid) => async(dispatch,getState) => {
   const responce = await fetch('http://localhost:6970/user',{
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',
    "Authorization": `${localStorage.getItem('token')}`},
    body:JSON.stringify({userid:userid})
   });
   const user = await responce.json();
   //getState().authToken;
   dispatch(currentUserActionCreator(user));
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
    
    const userid = await responce.json();
    console.log(userid);
    dispatch(signupActionCreator(userid));
}


export {fetchLogin, fetchCurrentUser,fetchSignup}