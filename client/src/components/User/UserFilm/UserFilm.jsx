
import FilmPreview from "../../AllFilms/FilmPreview/FilmPreview"
import Rating from "../../Rating/Rating"




const UserFilm = ({film}) => {
   


    


    return (
        <>
        <FilmPreview link={'/film/'} film={film}/>
        { <Rating  title={film.title}/>}
        </>
    )
}


export default UserFilm;