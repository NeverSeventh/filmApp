
import { noErrorActionCreator } from "./error";





const fetchEditFilm = (id,title,description) => async(dispatch,getState) => {
    const responce = await fetch('https://filmappserver.herokuapp.com/admin/editFilm',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({id,title,description})
       });
       if (responce.status ===200) {
        dispatch(noErrorActionCreator())
    }
}

const fetchAddFilm = (title,description) => async(dispatch,getState) => {
    const responce = await fetch('https://filmappserver.herokuapp.com/admin/addFilm',{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({title,description})
       });
       if (responce.status ===200) {
        dispatch(noErrorActionCreator())
    }
}

const fetchDeleteFilm = (id) => async(dispatch,getState) => {
    const responce = await fetch('https://filmappserver.herokuapp.com/admin/deleteFilm', {
        method:'DELETE',
        headers: {'Content-type':'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({id})
    });
    if (responce.status ===200) {
        dispatch(noErrorActionCreator())
    }
}

export {fetchEditFilm,fetchAddFilm,fetchDeleteFilm}