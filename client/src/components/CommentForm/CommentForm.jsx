import { useDispatch } from "react-redux"
import { fetchAddComment } from "../../redux/AC/films";



const CommentForm = ({userid,title}) => {

    const dispatch = useDispatch()

    const addCommentHandler = (e) => {
        e.preventDefault();
        dispatch(fetchAddComment(title,userid,e.target.comment.value))
    }

    return (
        <form onSubmit={addCommentHandler}>
            <input type="text" name="comment" />
            <button type="submit">comment</button>
        </form>
    )
}


export default CommentForm