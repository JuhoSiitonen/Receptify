import { useDispatch } from 'react-redux'
import { deleteComment, getAllComments } from '../../../reducers/commentReducer'
import { useEffect, useState } from 'react'
import '../../../styles/comment.css'

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

    const formatTime = (dateToFormat) => {
        const date = new Date(dateToFormat);
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeString = date.toLocaleTimeString([], timeOptions);
        return `${date.toISOString().split('T')[0]} ${timeString}`;
    }

    return (
        <div className='comments'>
            <h3>Comments</h3>
            {comments.map(comment => (
                <div key={comment.id}>
                <p>{comment.comment} <br></br><b>{comment.user.username}</b> - {formatTime(comment.date)}</p>
                { user.id === comment.user.id && (
                    <button onClick={() => handleDelete(comment)}>Delete</button>
                )}
                </div>
                ))}
        </div>
    )
}

export default AllComments