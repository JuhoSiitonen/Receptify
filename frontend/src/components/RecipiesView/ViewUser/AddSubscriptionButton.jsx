import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSubscription } from '../../../reducers/userReducer'

const AddSubscriptionButton = ({ friendId }) => {
    const [buttonText, setButtonText] = useState('Subscribe')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const dispatch = useDispatch()


    const handleAddSubscription = async (e) => {
        e.preventDefault()
        try {
            await dispatch(addSubscription(friendId))
            setButtonText('Subscription added')
            setIsSubscribed(true)
        }catch (error) {
            console.log(error)
            setButtonText('Subscribed')
            setIsSubscribed(true)
        }
    }

    return (
        <div>
            {!isSubscribed && <button onClick={handleAddSubscription}>{buttonText}</button>}
            {isSubscribed && <button disabled>{buttonText}</button>}
        </div>
    )
}

export default AddSubscriptionButton