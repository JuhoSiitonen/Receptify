import { useDispatch } from 'react-redux'
import { deleteComment } from '../../../reducers/commentReducer'

const AllComments = ({ comments, user }) => {
    const dispatch = useDispatch()

    const handleDelete = ( comment ) => {
        dispatch(deleteComment(comment.id))
        console.log('delete')
    }

    if (!comments) {
        return <>No comments</>
    }
    return (
        <div>
            <h2>Comments</h2>
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