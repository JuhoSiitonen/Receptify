import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../reducers/commentReducer'

const AllComments = () => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const user = useSelector(state => state.user)

    const handleDelete = async ( comment ) => {
        await dispatch(deleteComment(comment.id))
    }

    if (!comments) {
        return <p>No comments</p>
    }
    return (
        <div>
            <h3>Comments</h3>
            {comments.map(comment => (
                <div key={comment.id}>
                <p>{comment.comment} - {comment.user.username}  {comment.date}</p>
                { user.id === comment.user.id && (
                    <button onClick={() => handleDelete(comment)}>Delete</button>
                )}
                </div>
                ))}
        </div>
    )
}

export default AllComments