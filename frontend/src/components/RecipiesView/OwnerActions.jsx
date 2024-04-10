import { useNavigate } from 'react-router-dom'
import DeleteButton from './Buttons/DeleteButton'
import AllComments from './Comment/AllComments'
import Togglable from '../Togglable'

const OwnerActions = ({ recipe, user }) => {
    const navigate = useNavigate()

    return (
        <div className='user-actions'>
          <div className='action-button'>
            <button onClick={() => navigate(`/recipes/${recipe.id}`)}>Edit</button>
          </div>
          <div className='action-button'>
            <DeleteButton recipy={recipe} />
          </div>
          <div className='action-button'>
            <Togglable buttonLabel="Show comments" cancelLabel="Hide comments" topCancel={true}>
                <AllComments user={user} recipy={recipe}/>
            </Togglable>
          </div>
        </div>
    )
}

export default OwnerActions