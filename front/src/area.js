import './area.css';
import React from 'react';

const hits = [
    {x: 1, y: 1, r: 2, doesHit: true},
    {x: 0, y: 0, r: 2, doesHit: true},
    {x: -1, y: -0.5, r: 2, doesHit: false},
    {x: 0, y: 0, r: 1.5, doesHit: true},
]

const xOptions = [-3, -2, -1, 0, 1, 2, 3, 4, 5]

export default class Area extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
        }
    }

    handleChangeX = (x) => {
        this.setState({x})
    }

    render() {
        return (
            <div>
                <canvas id="area" />
                <form className="coordinates">

                    <label>
                        x
                        {/*<Autocomplete
                            direction="down"
                            label="Choose x"
                            hint="You can only choose one..."
                            multiple={false}
                            onChange={this.handleChangeX}
                            source={xOptions}
                            value={this.state.x}
                        />*/}
                    </label>

                    <label>
                        y <input id="yInput" name="y" value="0" type="text" size="15" maxLength="4" autoComplete="off" />
                    </label>

                    <label>
                        r <input id="yInput" name="y" value="0" type="text" size="15" maxLength="4" autoComplete="off" />
                    </label>
                </form>

                <button onClick={this.props.goToMainPage}>Go to main page</button>

                <table className="hits">
                    <thead>
                    <tr>
                        <td>X</td>
                        <td>Y</td>
                        <td>R</td>
                        <td>does hit</td>
                    </tr>
                    </thead>
                    <tbody>
                    {hits.map((hit, i) => (
                        <tr key={i}>
                            <td>{hit.x}</td>
                            <td>{hit.y}</td>
                            <td>{hit.r}</td>
                            <td>{hit.doesHit ? "Попадание есть" : "Попадания нет"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
