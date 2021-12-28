import Login from "./login";
import Area from "./area";
import React from 'react';
import { useSelector } from 'react-redux'

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
