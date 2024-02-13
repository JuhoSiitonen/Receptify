import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSubscription } from '../../../reducers/userReducer'

const AddSubscriptionButton = ({ friendId }) => {
    const [buttonText, setButtonText] = useState('Subscribe')
    const dispatch = useDispatch()


    const handleAddSubscription = async (e) => {
        e.preventDefault()
        try {
            await dispatch(addSubscription(friendId))
            setButtonText('Subscription added')
        }catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={handleAddSubscription}>{buttonText}</button>
        </div>
    )
}

export default AddSubscriptionButton