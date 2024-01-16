import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../reducers/commentReducer'
import { addNotification } from '../../../reducers/notificationReducer'

const Comment = ({ recipyId }) => { 
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentObject = {
            content: e.target.comment.value,
            userId: user.id,
        }
        try {
            await dispatch(createComment(recipyId, commentObject))
        }
        catch (error) {
            console.log(error)
        }
        e.target.comment.value = ''
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