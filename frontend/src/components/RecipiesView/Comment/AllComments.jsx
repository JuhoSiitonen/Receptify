import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, getAllComments } from '../../../reducers/commentReducer'
import { useEffect, useState } from 'react'
import './comment.css'

const AllComments = ({ user, recipy }) => {
    const dispatch = useDispatch()
    const [comments, setComments] = useState()

    useEffect(() => {
        const fetchComments = async () => {
            let results = await dispatch(getAllComments(recipy.id))
            setComments(results)
        }
        fetchComments()
    }, [])

    const handleDelete = async ( comment ) => {
        await dispatch(deleteComment(comment.id))
        setComments(comments.filter(c => c.id !== comment.id))
    }

    if (!comments) {
        return <p>No comments</p>
    }

    return (
        <div className='comments'>
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