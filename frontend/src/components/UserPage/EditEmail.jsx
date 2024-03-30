import { useState } from 'react'

const EditEmail = ({ user }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Save', email)
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
