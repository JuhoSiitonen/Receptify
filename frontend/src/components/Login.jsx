import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { login } from '../reducers/userReducer'
import './Login.css'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username.length < 3 || password.length < 3) {
            alert('Username and password must be at least 3 characters long')
            return
        }
        try {
            await dispatch(login({username, password}))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        setUsername('')
        setPassword('')
    }

    const handleUsernameChange = (event) => {
        if (event.target.value.length < 20) {
            setUsername(event.target.value)
        } else {
            alert('Username must be less than 20 characters')
        }
    }

    const handlePasswordChange = (event) => {
        if (event.target.value.length < 20) {
            setPassword(event.target.value)
        } else {
            alert('Password must be less than 20 characters')
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
            <br></br>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default Login
