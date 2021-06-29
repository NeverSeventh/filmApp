import { NavLink } from 'react-router-dom';
import './filmPreview.scss'
const FilmPreview = ({film}) => {
    const image = film.img || './img/placeholderpng.png';
    if (film.description?.length >300) {
        film.description = film.description.substring(0,300);
        film.description = film.description +  '...';
    }
    return (
        <div className="filmPreview">
            <NavLink  to={"/film/"+film.filmLink}>
                <h3 className="filmPreview__title">{film.title}</h3>
                <div className="filmPreview__body">
                    <img src={image} width="150px" height="150px" alt="" className="filmPreview__img" />
                    <div className="filmPreview__desc">
                        <p>{film.description}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default FilmPreview;