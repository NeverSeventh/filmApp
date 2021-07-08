import { useState } from "react";
import { useDispatch } from "react-redux"
import { fetchAddComment } from "../../redux/AC/films";



const CommentForm = ({title}) => {

    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');


    const addCommentHandler = (e) => {
        e.preventDefault();
        dispatch(fetchAddComment(title,e.target.comment.value));
        setCommentText('');
    }

    return (
        <form onSubmit={addCommentHandler}>
            <input type="text" value={commentText} onChange={e=>setCommentText(e.target.value)} name="comment" />
            <button type="submit">comment</button>
        </form>
    )
}


export default CommentForm