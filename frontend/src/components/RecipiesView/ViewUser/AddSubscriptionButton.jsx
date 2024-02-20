import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSubscription, deleteSubscription } from '../../../reducers/userReducer'

const AddSubscriptionButton = ({ friendId, user }) => {
    const [isSubscribed, setIsSubscribed] = useState(user.subscriptions.some(s => s.id === friendId))
    const dispatch = useDispatch()

    const handleAddSubscription = async (e) => {
        e.preventDefault()
        try {
            await dispatch(addSubscription(friendId))
            setIsSubscribed(true)
        }catch (error) {
            console.log(error)
        }
    }

    const handleDeleteSubscription = async (e) => {
        e.preventDefault()
        try {
            await dispatch(deleteSubscription(friendId))
            setIsSubscribed(false)
        }catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {!isSubscribed && <button onClick={handleAddSubscription}>Subscribe</button>}
            {isSubscribed && <button onClick={handleDeleteSubscription}>Unsubscribe</button>}
        </div>
    )
}

export default AddSubscriptionButton