import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteRecipy } from '../../../reducers/recipyReducer'

const DeleteButton = ({ recipy }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${recipy.title}?`) === false) {
            return
        }
        dispatch(deleteRecipy(recipy.id))
        navigate('/recipes')
    }

    return (
        <div>
            <button name='deleteRecipy' onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteButton