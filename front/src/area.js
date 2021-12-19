import './area.css';
import React from 'react';
import { Autocomplete, TextField, Button, CircularProgress } from '@mui/material';

function addHit(x, y, r) {
    return new Promise(resolve => {
        function success() {
            resolve({ code: 200, body: { doesHit: true } })
        }

        function failure() {
            resolve({ code: 400, body: { field: 'r', message: 'radius can\'t be negative'}})
        }

        setTimeout(r < 0 ? failure : success, 1000)
    })
}

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
            hits: [
                {x: 1, y: 1, r: 2, doesHit: true},
                {x: 0, y: 0, r: 2, doesHit: true},
                {x: -1, y: -0.5, r: 2, doesHit: false},
                {x: 0, y: 0, r: 1.5, doesHit: true},
            ],
            validation: null,
            isLoading: false,
        }
    }

    handleChangeX = (event, x) => {
        this.setState({x})
    }

    handleChangeY = (event) => {
        this.setState({y: event.target.value})
    }

    handleChangeR = (event, r) => {
        if (this.fieldValidationMessage('r') != null) {
            this.setState({ validation: null })
        }
        this.setState({r})
    }

    addPoint = () => {
        let x = this.state.x.id;
        let y = this.state.y.id;
        let r = this.state.r.id;

        this.setState({
            isLoading: true,
        })
        addHit(x, y, r).then(response => {
            if (response.code === 400) {
                this.setState({
                    validation: response.body,
                })

            } else if (response.code === 200) {
                this.setState(prevState => ({
                    hits: prevState.hits.concat({x, y, r, doesHit: response.body.doesHit})
                }))
            } else {
                console.error("unknown response code: " + response.code)
            }
        }).finally(() => {
            this.setState({
                isLoading: false,
            })
        })
    }

    fieldValidationMessage(field) {
        let validation = this.state.validation
        if (validation == null) {
            return null
        }

        if (validation.field !== field) {
            return null
        }

        return validation.message
    }

    render() {
        return (
            <div>
                <canvas id="area" />
                    <Autocomplete
                        disablePortal
                        disableClearable
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
                        disableClearable
                        options={rOptions}
                        sx={{ width: 300, marginBottom: 2 }}
                        value={this.state.r}
                        onChange={this.handleChangeR}
                        renderInput={(params) => {
                            let validationMessage = this.fieldValidationMessage('r')

                            return (
                                <TextField
                                    label={validationMessage || "Radius"}
                                    error={validationMessage !== null}
                                    {...params}
                                />
                            );
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={this.addPoint}
                        startIcon={this.state.isLoading ? <CircularProgress size={12} /> : null}
                        disabled={this.state.isLoading}
                    >
                        Add point
                    </Button>

                <Button variant="outlined" color="error" onClick={this.props.logout}>Log out</Button>

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
                    {this.state.hits.map((hit, i) => (
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
