import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, getAllComments } from '../../../reducers/commentReducer'
import { useEffect } from 'react'

const AllComments = ({ user, recipy }) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)

    useEffect(() => {
        dispatch(getAllComments(recipy.id))
    }, [])

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