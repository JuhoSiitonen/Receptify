import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { addNotification } from '../reducers/notificationReducer';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2 || password.length < 3) {
            dispatch(addNotification('Passwords do not match or are too short!'));
            setPassword('');
            setPassword2('');
            return;
        }
        try { 
            await dispatch(signup({ username, password }));
            setUsername('');
            setPassword('');
            setPassword2('');
            dispatch(addNotification('Sign up successful!'));
            navigate('/');
        } catch (error) {
            setUsername('');
            dispatch(addNotification('Username already in use!'));
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