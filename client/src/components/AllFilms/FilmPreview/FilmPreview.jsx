import { NavLink } from 'react-router-dom';
import './filmPreview.scss'



const FilmPreview = ({film,link}) => {
    
    if (film.description?.length >300) {
        film.description = film.description.substring(0,300);
        film.description = film.description +  '...';
    }


    return (
        <div className="filmPreview">
            <NavLink  to={link+film.title}>
                <h3 className="filmPreview__title">{film.title}</h3>
                <div className="filmPreview__body">
                    <div className="filmPreview__desc">
                        <p>{film.description}</p>
                    </div>
                </div>
            </NavLink>
            
        </div>
    )
}

export default FilmPreview;