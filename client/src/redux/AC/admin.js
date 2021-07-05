import { EDIT_FILM } from "../types"



const editFilmActionCreator = (payload) => {
     return {type:EDIT_FILM,payload:payload}
}

const fetchEditFilm = (id,title,description) => async(dispatch,getState) => {
    const responce = await fetch('http://localhost:6970/admin/editFilm',{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({id,title,description})
       });
}


export {fetchEditFilm}