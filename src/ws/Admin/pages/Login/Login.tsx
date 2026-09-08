import { isEmpty } from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CONSTANTS } from '../../../../helpers/constants.ts'
import Input from '../../shared/Input/Input.tsx'
import './Login.css'
import { useLoginHook } from '../../hooks/admin.hook.ts';
import axios from 'axios';

const JSON_DATA = {
    USERNAME_LABEL: "Username",
    USERNAME_PLACEHOLDER: "Enter your username",
    PASSWORD_LABEL: "Password",
    PASSWORD_PLACEHOLDER: "Enter your password",
    USER_ERROR: "Username is required",
    PASSWORD_ERROR: "Password is required",
    TEST: "Input",
    TEST_VALUE: "Input"
};

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(CONSTANTS.EMPTY_STRING);
    const [password, setPassword] = useState(CONSTANTS.EMPTY_STRING);
    const [userError, setUserError] = useState(CONSTANTS.EMPTY_STRING);
    const [passwordError, setPasswordError] = useState(CONSTANTS.EMPTY_STRING);

    const { mutate } = useLoginHook();

    /**
     * @description Handles the change event for the username input field.
     * @param {string} value - The new value of the username input.
     * @returns {void}
     */
    const handleUsernameChange = (value: string) => {
        setUsername(value);
        if (!isEmpty(value)) {
            setUserError(CONSTANTS.EMPTY_STRING);
        }
    };

    /**
     * @description Handles the change event for the password input field.
     * @param {string} value - The new value of the password input.
     * @returns {void}
     */
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (!isEmpty(value)) {
            setPasswordError(CONSTANTS.EMPTY_STRING);
        }
    };

    /**
     * @description Handles the login form submission.
     * @param {React.ChangeEvent<HTMLFormElement>} e - The form submission event.
     * @returns {void}
     */
    const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
       if (isEmpty(username)) {
           setUserError(JSON_DATA.USER_ERROR);
       } else {
           setUserError(CONSTANTS.EMPTY_STRING);
       }

       if (isEmpty(password)) {
           setPasswordError(JSON_DATA.PASSWORD_ERROR);
       } else {
           setPasswordError(CONSTANTS.EMPTY_STRING);
       }

       if (!isEmpty(username) && !isEmpty(password)) {
            mutate({ username, password }, {
                onSuccess: (response) => {
                    const token = response.data?.data?.token ?? response.data?.token;
                    if (token) {
                        localStorage.setItem('token', token);
                    }
                    navigate('/admin/panel');
                },
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        console.error("Login error:", error.response?.status);
                        alert(error.response?.data?.message || error.message);
                    } else {
                        alert("Error al iniciar sesión");
                    }
                }
            });
       }
    };

    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <form className="form-container" onSubmit={handleLogin}>
                        <Input
                            label={JSON_DATA.USERNAME_LABEL}
                            inputType="text"
                            placeholder={JSON_DATA.USERNAME_PLACEHOLDER}
                            errorMessage={userError}
                            error={!isEmpty(userError)}
                            onChange={handleUsernameChange}
                        ></Input>
                        <Input
                            label={JSON_DATA.PASSWORD_LABEL}
                            inputType="password"
                            placeholder={JSON_DATA.PASSWORD_PLACEHOLDER}
                            errorMessage={passwordError}
                            error={!isEmpty(passwordError)}
                            onChange={handlePasswordChange}
                        ></Input>

                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
