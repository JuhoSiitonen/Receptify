import { useState } from 'react'
import userService from '../../../services/users'

const AddFriendButton = ({ friendId }) => {
    const [buttonText, setButtonText] = useState('Add friend')

    const handleAddFriend = async (e) => {
        e.preventDefault()
        await userService.addFriend(friendId)
        setButtonText('Friend added')
    }

    return (
        <div>
            <button onClick={handleAddFriend}>{buttonText}</button>
        </div>
    )
}

export default AddFriendButton