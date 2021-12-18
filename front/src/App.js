import './App.css';
import Main from "./Main";
import CheckArea from "./CheckArea";
import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'main'
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {
                        this.state.page === 'main'
                            ? <Main goToCheckAreaPage={() => this.setState({ page: 'checkArea' })}/>
                            : <CheckArea goToMainPage={() => this.setState({ page: 'main' })}/>
                    }

                </header>
            </div>
        );
    }
}
