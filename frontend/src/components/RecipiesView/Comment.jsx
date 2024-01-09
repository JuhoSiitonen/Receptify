import { useDispatch, useSelector } from 'react-redux'

const Comment = () => { 
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentObject = {
            comment: e.target.comment.value,
            userId: user.id,
        }
        dispatch(createComment(recipyId, commentObject))
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Comment