import { useNavigate } from "react-router-dom"
import FavoriteButton from "./FavoriteButton"
import Togglable from "../Togglable"
import Comment from "./Comment"
import Rating from "./Rating"
import AllComments from "./Comment/AllComments"
import '../ButtonStyle.css'

const UserActions = ({ recipe, user }) => {
    const navigate = useNavigate()

    return (
        <div className='user-actions'>
          <div className='action-button'>
            <button onClick={() => navigate(`/users/${recipe.owner.id}/view`)}>View User
            </button>
          </div>
          <div className='action-button'>
            <FavoriteButton recipyId={recipe.id} user={user} />
          </div>
          <div className='action-button'>
            <Togglable buttonLabel="Comment">
                <Comment recipyId={recipe.id} />
            </Togglable>
          </div>
          <div className='action-button'>
             <Togglable buttonLabel="Rate">
                <Rating  recipyId={recipe.id} />
            </Togglable>
          </div>
          <div className='action-button'>
            <Togglable buttonLabel="Show comments" cancelLabel="Hide comments" topCancel={true}>
                <AllComments />
            </Togglable>
          </div>
        </div>
    )
}

export default UserActions