import "./comment.scss"

const Comment = ({comment}) => {
    
    return(

        <div className="comment">
            <div className="comment__nickname">{comment.nickname}</div>
            <div className="comment__text">
                <p>{comment.text}</p>
            </div>
        </div>
    )

}


export default Comment;