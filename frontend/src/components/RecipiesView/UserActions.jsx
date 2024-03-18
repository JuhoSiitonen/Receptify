import { useNavigate } from "react-router-dom"
import FavoriteButton from "./FavoriteButton"
import Togglable from "../Togglable"
import Comment from "./Comment"
import Rating from "./Rating"
import AllComments from "./Comment/AllComments"

const UserActions = ({ recipe, user }) => {
    const navigate = useNavigate()

    return (
        <div >
            <button onClick={() => navigate(`/users/${recipe.owner.id}/view`)}>View User
            </button>
            <FavoriteButton recipyId={recipe.id} user={user} />
            <Togglable buttonLabel="Comment">
                <Comment recipyId={recipe.id} />
            </Togglable>
             <Togglable buttonLabel="Rate">
                <Rating  recipyId={recipe.id} />
            </Togglable>
            <Togglable buttonLabel="Show comments" cancelLabel="Hide comments" topCancel={true}>
                <AllComments />
            </Togglable>
        </div>
    )
}

export default UserActions