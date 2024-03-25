import Togglable from "../../Togglable"
import UpdateForm from "./UpdateForm"

const UpdateRecipy = ({ recipy }) => {

    return (
        <div className='action-button user-actions'>
            <Togglable buttonLabel="Update">
                <UpdateForm recipy={recipy} />
            </Togglable>
        </div>
    )
}

export default UpdateRecipy