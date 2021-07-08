import { EDIT_FILM } from "../types"





const fetchEditFilm = (id,title,description) => async(dispatch,getState) => {
    const responce = await fetch('http://localhost:6970/admin/editFilm',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({id,title,description})
       });
}

const fetchAddFilm = (title,description) => async(dispatch,getState) => {
    const responce = await fetch('http://localhost:6970/admin/addFilm',{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({title,description})
       });
}

const fetchDeleteFilm = (id) => async(dispatch,getState) => {
    const responce = await fetch('http://localhost:6970/admin/deleteFilm', {
        method:'DELETE',
        headers: {'Content-type':'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({id})
    })
}

export {fetchEditFilm,fetchAddFilm,fetchDeleteFilm}