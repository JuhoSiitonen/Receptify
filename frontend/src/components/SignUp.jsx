import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { addNotification } from '../reducers/notificationReducer';
import './SignUp.css';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length < 3) {
            dispatch(addNotification({
                message: 'Username must be at least 3 characters long', 
                error: true}));
            setUsername('');
            return;
        }
        if (password !== password2 || password.length < 3) {
            dispatch(addNotification({
                message: 'Passwords do not match or are too short!', 
                error: true}));
            setPassword('');
            setPassword2('');
            return;
        }
        try { 
            await dispatch(signup({ username, password }));
            setUsername('');
            setPassword('');
            setPassword2('');
            
            navigate('/');
        } catch (error) {
            setUsername('');
        }
    }

    const handleUsernameChange = (event) => {
        if (event.target.value.length < 20) {
            setUsername(event.target.value);
        } else {
            dispatch(addNotification({
                message: 'Username must be less than 20 characters', 
                error: true}));
        }
    }

    const handlePasswordChange = (event) => {
        if (event.target.value.length < 20) {
            setPassword(event.target.value);
        } else {
            dispatch(addNotification({
                message: 'Password must be less than 20 characters', 
                error: true}));
        }
    }

    const handlePassword2Change = (event) => {
        if (event.target.value.length < 20) {
            setPassword2(event.target.value);
        } else {
            dispatch(addNotification({
                message: 'Password must be less than 20 characters', 
                error: true}));
        }
    }

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={handlePasswordChange} />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name="password2" onChange={handlePassword2Change} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp