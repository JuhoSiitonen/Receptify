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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(login({username, password}))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <br></br>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default Login
