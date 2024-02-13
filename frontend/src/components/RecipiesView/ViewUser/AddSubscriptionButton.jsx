import { useState } from 'react'
import userService from '../../../services/users'

const AddSubscriptionButton = ({ friendId }) => {
    const [buttonText, setButtonText] = useState('Subscribe')

    const handleAddSubscription = async (e) => {
        e.preventDefault()
        await userService.addSubscription(friendId)
        setButtonText('Subscription added')
    }

    return (
        <div>
            <button onClick={handleAddSubscription}>{buttonText}</button>
        </div>
    )
}

export default AddSubscriptionButton