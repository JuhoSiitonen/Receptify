import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editEmail } from '../../reducers/userReducer'

const EditEmail = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            alert('Please fill in email field')
            return
        }
        dispatch(editEmail({email}))
    }

    return (
        <div>
            <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <button type="submit" onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default EditEmail
