import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAddFilm } from "../../../redux/AC/admin";
import '../admin.scss'; 




const AddFilm = () => {
    const dispacth = useDispatch();
    const history = useHistory();
    
    const addFilmHandler = (e) => {
        e.preventDefault();
        const {title,desc} = e.target;
        dispacth(fetchAddFilm(title.value,desc.value))
        
    }

    return (
        <form className='admin__form' onSubmit={addFilmHandler}>
            <div className="admin__block">
            <input className="admin__title" type="text" name="title"  />
            </div>
                
                <textarea name="desc" id="" className="admin__desc" cols="50" rows="10"></textarea>
                <div className="admin__block">
                <button type="submit" className="btn">Добавить фильм</button>
                </div>
        </form>
    )
}


export default AddFilm;