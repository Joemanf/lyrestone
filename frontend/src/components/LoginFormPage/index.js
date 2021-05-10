import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user); // Grab the user from the store
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/home" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const loginAsDemo = (e) => {
        setCredential('Demo-lition');
        setPassword('password');
        return dispatch(sessionActions.login({ credential, password }))
    }

    return (
        <form onSubmit={handleSubmit} className='login_form'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='inputs_container'>
                <div className='credential_container'>
                    <label>
                        Username or Email
                    </label>
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </div>
                <div className='password_container'>
                    <label>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className='login_container'>
                <button type="submit">Log In</button>
                <button onClick={loginAsDemo}>Try it out</button>
            </div>
        </form>
    );
}

export default LoginFormPage;