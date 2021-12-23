import React from 'react';
import './login.css'
import {TextField, Button, Alert, CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {combineReducers} from "redux";
import {LOGIN_REQUESTED_ACTION, LOGIN_FINISHED_ACTION, LOGOUT_ACTION} from "./app";

const USERNAME_CHANGED_ACTION = 'USERNAME_CHANGED_ACTION'

function usernameReducer(state, action) {
    if (typeof state === 'undefined') {
        return ''
    }

    switch (action.type) {
        case USERNAME_CHANGED_ACTION:
            return action.username
    }

    return state;
}

const PASSWORD_CHANGED_ACTION = 'PASSWORD_CHANGED_ACTION'

function passwordReducer(state, action) {
    if (typeof state === 'undefined') {
        return ''
    }

    switch (action.type) {
        case PASSWORD_CHANGED_ACTION:
            return action.password
    }

    return state;
}

function isLoadingReducer(state, action) {
    if (typeof state === 'undefined') {
        return false
    }

    switch (action.type) {
        case LOGIN_REQUESTED_ACTION:
            return true
        case LOGIN_FINISHED_ACTION:
            return false
    }

    return state;
}

function errorReducer(state, action) {
    if (typeof state === 'undefined') {
        return ""
    }

    switch (action.type) {
        case USERNAME_CHANGED_ACTION:
        case PASSWORD_CHANGED_ACTION:
            return "";

        case LOGOUT_ACTION:
            if (!action.initiatedByUser) {
                return "session expired"
            }
            break;
        case LOGIN_FINISHED_ACTION:
            if (!action.success) {
                return "Wrong credentials"
            }
            break;
    }

    return state;
}

export const loginFormReducer = combineReducers({
    username: usernameReducer,
    password: passwordReducer,
    isLoading: isLoadingReducer,
    error: errorReducer,
})

export default function Login() {
    const username = useSelector(state => state.loginForm.username)
    const password = useSelector(state => state.loginForm.password)
    const isLoading = useSelector(state => state.loginForm.isLoading)
    const error = useSelector(state => state.loginForm.error)
    const dispatch = useDispatch()

    function login() {
        dispatch({ type: LOGIN_REQUESTED_ACTION })

        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
        headers.set('X-Requested-With', 'XMLHttpRequest');

        fetch('/hits', {
            method: 'GET',
            headers: headers,
        })
            .then(response => {
                if (response.status === 401) {
                    throw new Error("wrong credentials")
                }

                return response.json();
            })
            .then(json => {
                dispatch({ type: LOGIN_FINISHED_ACTION, success: true, hits: json })
            }).catch(() => {
                dispatch({ type: LOGIN_FINISHED_ACTION, success: false })
            })
    }

    return (
        <header>
            <h1>Лабораторная работа №4</h1>
            <ul>
                <li>Студент: <span className="author-name">Иванов Алексей Анатольевич</span></li>
                <li>Группа: <span className="cursive">P3211</span></li>
                <li>Вариант: 12086</li>
            </ul>

            <TextField
                label="User"
                variant="outlined"
                value={username}
                onChange={(e) => {
                    dispatch({
                        type: USERNAME_CHANGED_ACTION,
                        username: e.target.value,
                    })
                }}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => {
                    dispatch({
                        type: PASSWORD_CHANGED_ACTION,
                        password: e.target.value,
                    })
                }}
            />
            <Button
                variant="outlined"
                onClick={login}
                startIcon={isLoading ? <CircularProgress size={12} /> : null}
                disabled={isLoading}
            >
                Login
            </Button>

            {error && (
                <Alert severity="error">{error}</Alert>
            )}
        </header>
    );
}
