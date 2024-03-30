import EditAboutMe from "./EditAboutMe";
import EditEmail from "./EditEmail";
import Togglable from "../Togglable"

const EditUserinfo = ({ user }) => {
    let placeholder = 'Enter email';

    if (user.email) {
        placeholder = 'Edit email'
    }

    return (
        <div className="edit-user-actions">
        <Togglable buttonLabel='Edit ebout me info'>
            <EditAboutMe user={user} />
        </Togglable>
        <Togglable buttonLabel={placeholder}>
            <EditEmail user={user} />
        </Togglable>
        </div>
    )
}

export default EditUserinfo