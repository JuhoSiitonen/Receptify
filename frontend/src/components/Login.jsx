import { useState } from 'react'
import { useDispatch } from 'react-redux'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        //dispatch(login(username, password))
        setUsername('')
        setPassword('')
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
        </div>
    )
}

export default Login