import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css'

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user); // Grabbing logged in user
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '1'
        }, 500)
    }, [])

    if (sessionUser) return <Redirect to="/home" />; // Change to history.push might fix the store

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (email.includes("@") && email.includes("."))
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, image, }))
                .then((data) => {
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setImage(null);
                    if (data.valErrs.length) {
                        setErrors(data.valErrs)
                    }
                    // console.log('DATA HERE!!!!!!!!!!', data)
                })
                .catch(async (res) => {
                    const data = await res.json(); // Bug here (Maybe), fix later
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <form onSubmit={handleSubmit} className='signup_form'>
            <div>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <div className='inputs_container_signup'>
                <div className='email_container'>
                    <label>
                        Email
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='username_container'>
                    <label>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='file_container'>
                    <label>Profile Picture</label>
                    <input type="file" onChange={updateFile} />
                </div>
                <div className='signup_password_container'>
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
                <div className='confirm_password_container'>
                    <label>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className='signup_container'>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
}

export default SignupFormPage;