import './app.css';
import Login from "./login";
import Area from "./area";
import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">


                </header>
                <main>
                    {this.state.loggedIn
                        ? <Area goToMainPage={() => this.setState({ loggedIn: false })}/>
                        : <Login goToCheckAreaPage={() => this.setState({ loggedIn: true })}/>
                    }
                </main>
            </div>
        );
    }
}
