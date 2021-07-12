import FilmPreview from "../../AllFilms/FilmPreview/FilmPreview"
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchAllFilms } from "../../../redux/AC/films";
const AdminFilms = () => {

   const films = useSelector(state=>state.films);
    

   
   const dispatch = useDispatch();
   
   useEffect(()=> {
       dispatch(fetchAllFilms());
   },[]) 

   const filmsLinks = films?.map(el=> {
      return <li key={el.id}> <FilmPreview film={el} link = "/admin/"></FilmPreview></li>
  })

   return (
   <ul className="admin__list">
      {filmsLinks}
   </ul>
   )
}


export default AdminFilms;