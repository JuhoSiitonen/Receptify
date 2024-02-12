import { useState } from 'react'
import { useDispatch } from 'react-redux'

const AddFriendButton = ({ friendId, addFriend }) => {
    const [buttonText, setButtonText] = useState('Add friend')
    const dispatch = useDispatch()

    const handleAddFriend = async () => {
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