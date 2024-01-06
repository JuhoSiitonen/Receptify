import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup, login } from '../reducers/userReducer';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            return;
        }
        try {
            const response = dispatch(signup(username, password));
            console.log(response);
            if (response.status === 201) {
                const loginResponse = dispatch(login(username, password));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name="password2" onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default SignUp