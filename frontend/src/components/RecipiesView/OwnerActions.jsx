import { useNavigate } from 'react-router-dom'
import DeleteButton from './DeleteButton'
import AllComments from './Comment/AllComments'
import Togglable from '../Togglable'

const OwnerActions = ({ recipe, user }) => {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate(`/recipes/${recipe.id}`)}>Edit</button>
            <DeleteButton recipy={recipe} />
            <Togglable buttonLabel="Show comments" cancelLabel="Hide comments" topCancel={true}>
                <AllComments user={user} recipy={recipe}/>
            </Togglable>
        </div>
    )
}

export default OwnerActions