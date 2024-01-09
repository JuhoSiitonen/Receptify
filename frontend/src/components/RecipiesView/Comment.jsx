import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../reducers/commentReducer'

const Comment = ({ recipyId }) => { 
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentObject = {
            content: e.target.comment.value,
            userId: user.id,
        }
        dispatch(createComment(recipyId, commentObject))
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="comment" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Comment