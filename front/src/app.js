import Login from "./login";
import Area from "./area";
import React from 'react';
import { useSelector } from 'react-redux'

export const LOGIN_REQUESTED_ACTION = 'LOGIN_REQUESTED_ACTION'
export const LOGIN_FINISHED_ACTION = 'LOGIN_FINISHED_ACTION'
export const LOGOUT_ACTION = 'LOGOUT_ACTION'

export function loginReducer(state, action) {
    if (typeof state === 'undefined') {
        return false
    }

    switch (action.type) {
        case LOGIN_FINISHED_ACTION:
            if (action.success) {
                return true
            }
            break
        case LOGOUT_ACTION:
            return false
    }

    return state;
}


export default function App() {
    const loggedIn = useSelector(state => state.isLoggedIn )

    return (
        <div className="App">
            <main>
                {loggedIn ? <Area /> : <Login/>}
            </main>
        </div>
    );
}
