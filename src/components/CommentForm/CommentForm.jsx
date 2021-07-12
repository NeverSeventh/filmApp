import { useState } from "react";
import { useDispatch } from "react-redux"
import { fetchAddComment } from "../../redux/AC/films";
import './commentForm.scss'


const CommentForm = ({title}) => {

    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');


    const addCommentHandler = (e) => {
        e.preventDefault();
        dispatch(fetchAddComment(title,e.target.comment.value));
        setCommentText('');
    }

    return (
        <form className='commentForm' onSubmit={addCommentHandler}>
            <input type="text" value={commentText} onChange={e=>setCommentText(e.target.value)} name="comment" />
            <button type="submit">Оставить комментарий</button>
        </form>
    )
}


export default CommentForm