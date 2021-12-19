import React from 'react';
import './login.css'
import { TextField, Button, Alert } from "@mui/material";

function fakeLogin(user, password) {
    return new Promise(resolve => {
        function success() {
            resolve({ code: 200 })
        }
        function failure() {
            resolve({ code: 400 })
        }
        setTimeout(user === 'alex' ? success: failure, 1000)
    })
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: '',
            error: false,
        }
    }

    onUserChanged = (event) => {
        this.setState({user: event.target.value, error: false})
    }

    onPasswordChanged = (event) => {
        this.setState({password: event.target.value, error: false})
    }

    login = () => {
        fakeLogin(this.state.user, this.state.password).then(response => {
            if (response.code === 200) {
                this.props.goToCheckAreaPage()
            } else {
                this.setState({
                    error: true,
                })
            }
        })
    }

    render() {
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
                    value={this.state.user}
                    onChange={this.onUserChanged}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChanged}
                />
                <Button variant="outlined" onClick={this.login}>Login</Button>

                {this.state.error && (
                    <Alert severity="error">Wrong credentials</Alert>
                )}

                <button onClick={this.props.goToCheckAreaPage}>Go to check area page</button>
            </header>
        );
    }
}
