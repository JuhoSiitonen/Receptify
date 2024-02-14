import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSubscription, deleteSubscription } from '../../../reducers/userReducer'

const AddSubscriptionButton = ({ friendId, subscriptionStatus }) => {
    const [isSubscribed, setIsSubscribed] = useState(subscriptionStatus)
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