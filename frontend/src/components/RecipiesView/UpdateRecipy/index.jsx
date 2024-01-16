import Togglable from "../../Togglable"
import UpdateForm from "./UpdateForm"

const UpdateRecipy = ({ recipy }) => {

    return (
        <div>
            <Togglable buttonLabel="Update">
                <UpdateForm recipy={recipy} />
            </Togglable>
        </div>
    )
}

export default UpdateRecipy