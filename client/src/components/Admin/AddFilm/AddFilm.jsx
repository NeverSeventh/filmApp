import { useDispatch } from "react-redux";
import { fetchAddFilm } from "../../../redux/AC/admin";





const AddFilm = () => {
    const dispacth = useDispatch();
    const addFilmHandler = (e) => {
        e.preventDefault();
        const {title,desc} = e.target;
        dispacth(fetchAddFilm(title.value,desc.value))
    }
    return (
        <form onSubmit={addFilmHandler}>
                <input type="text" name="title"  />
                <textarea name="desc" id="" cols="30" rows="10"></textarea>
                <button type="submit">Добавить фильм</button>
            
        </form>
    )
}


export default AddFilm;