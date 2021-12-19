import './area.css';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const hits = [
    {x: 1, y: 1, r: 2, doesHit: true},
    {x: 0, y: 0, r: 2, doesHit: true},
    {x: -1, y: -0.5, r: 2, doesHit: false},
    {x: 0, y: 0, r: 1.5, doesHit: true},
]

function toAutocompleteValue(value) {
    return { label: value.toString(), id: value }
}

const xOptions = [-3, -2, -1, 0, 1, 2, 3, 4, 5].map(toAutocompleteValue)
const rOptions = [-3, -2, -1, 0, 1, 2, 3, 4, 5].map(toAutocompleteValue)

export default class Area extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: xOptions[3],
            y: 0,
            r: rOptions[4],
        }
    }

    handleChangeX = (event, x) => {
        this.setState({x})
    }

    handleChangeY = (y) => {
        this.setState({y})
    }

    handleChangeR = (event, r) => {
        this.setState({r})
    }

    render() {
        return (
            <div>
                <canvas id="area" />
                    <Autocomplete
                        disablePortal
                        options={xOptions}
                        value={this.state.x}
                        onChange={this.handleChangeX}
                        sx={{ width: 300, marginBottom: 2 }}
                        renderInput={(params) => <TextField label="X" {...params} />}
                    />

                    <TextField
                        sx={{ width: 300, marginBottom: 2 }}
                        label="Y"
                        variant="outlined"
                        value={this.state.y}
                        onChange={this.handleChangeY}
                    />

                    <Autocomplete
                        disablePortal
                        options={rOptions}
                        sx={{ width: 300, marginBottom: 2 }}
                        value={this.state.r}
                        onChange={this.handleChangeR}
                        renderInput={(params) => <TextField label="Radius" {...params} />}
                    />
                    <Button variant="outlined">Add point</Button>

                <button style={{margin: '16px 0', display: 'block'}} onClick={this.props.goToMainPage}>Go to main page</button>

                <table className="hits">
                    <thead>
                    <tr>
                        <td>X</td>
                        <td>Y</td>
                        <td>R</td>
                        <td>Hit</td>
                    </tr>
                    </thead>
                    <tbody>
                    {hits.map((hit, i) => (
                        <tr key={i}>
                            <td>{hit.x}</td>
                            <td>{hit.y}</td>
                            <td>{hit.r}</td>
                            <td>{hit.doesHit ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
