
import FilmPreview from "../../AllFilms/FilmPreview/FilmPreview"
import Rating from "../../Rating/Rating"
import './userFilm.scss'



const UserFilm = ({film}) => {
   


    


    return (
        <div className="userFilm">
        <FilmPreview link={'/film/'} film={film}/>
        { <div className="userFilm__rating"><Rating  title={film.title}/></div>}
        </div>
    )
}


export default UserFilm;