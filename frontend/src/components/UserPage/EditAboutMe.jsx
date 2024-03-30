import { useState } from 'react'

const EditAboutMe = ({ user }) => {
    const [aboutMe, setAboutMe] = useState(user.about)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Save', aboutMe)
    }

    return (
        <div>
            <textarea
                type='text' 
                placeholder='Edit ebout me info' 
                rows="3" cols="50" maxLength="1000"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
            />
            <br></br>
            <button type='submit' onClick={handleSubmit}>Save</button>  
        </div>
    )
}

export default EditAboutMe