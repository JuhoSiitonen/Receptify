import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { login } from '../reducers/userReducer'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({username, password}))
        setUsername('')
        setPassword('')
        navigate('/recipes')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    Username:
                    <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    Password:
                    <input value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <br></br>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default Login
