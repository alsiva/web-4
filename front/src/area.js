import './area.css';
import React from 'react';
import {Autocomplete, Button, CircularProgress, TextField} from '@mui/material';
import {combineReducers} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT_ACTION} from "./app";

function fakeAddHit(x, y, r) {
    return new Promise(resolve => {
        function success() {
            resolve({code: 200, body: {doesHit: true}})
        }

        const error = {}
        if (r < 0) {
            error['r'] = 'radius can\'t be negative'
        }

        let floatRegex = /^-?\d+(\.\d+)?$/
        if (!floatRegex.test(y)) {
            error['y'] = 'y should be a number'
        }

        function failure() {
            resolve({code: 400, error})
        }

        setTimeout(Object.keys(error).length > 0 ? failure : success, 1000)
    })
}

const xOptions = [-3, -2, -1, 0, 1, 2, 3, 4, 5]

function xReducer(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }

    switch (action.type) {
        case X_CHANGED:
            return action.x
    }

    return state
}

function yReducer(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }

    switch (action.type) {
        case Y_CHANGED:
            return action.y
    }

    return state
}

function yValidationReducer(state, action) {
    if (typeof state === 'undefined') {
        return null
    }

    switch (action.type) {
        case ADD_HIT_REQUESTED:
        case Y_CHANGED:
            return null;

        case ADD_HIT_FINISHED:
            if (!action.success && action.error && action.error['y']) {
                return action.error['y']
            }
            break;
    }

    return state
}


const rOptions = [-3, -2, -1, 0, 1, 2, 3, 4, 5]

function rReducer(state, action) {
    if (typeof state === 'undefined') {
        return 1
    }

    switch (action.type) {
        case R_CHANGED:
            return action.r
    }

    return state
}

function rValidationReducer(state, action) {
    if (typeof state === 'undefined') {
        return null
    }

    switch (action.type) {
        case ADD_HIT_REQUESTED:
        case R_CHANGED:
            return null;
        case ADD_HIT_FINISHED:
            if (!action.success && action.error && action.error['r']) {
                return action.error['r']
            }
            break;
    }

    return state
}

const X_CHANGED = 'X_CHANGED';
const Y_CHANGED = 'Y_CHANGED';
const R_CHANGED = 'R_CHANGED';

const formReducer = combineReducers({
    x: combineReducers({
        value: xReducer
    }),
    y: combineReducers({
        value: yReducer,
        validationMessage: yValidationReducer,
    }),
    r: combineReducers({
        value: rReducer,
        validationMessage: rValidationReducer,
    }),
})


const ADD_HIT_REQUESTED = 'ADD_HIT_REQUESTED';
const ADD_HIT_FINISHED = 'ADD_HIT_FINISHED';

function hitsReducer(state, action) {
    if (typeof state === 'undefined') {
        return [
            {x: 1, y: 1, r: 2, doesHit: true},
            {x: 0, y: 0, r: 2, doesHit: true},
            {x: -1, y: -0.5, r: 2, doesHit: false},
            {x: 0, y: 0, r: 1.5, doesHit: true},
        ]
    }

    switch (action.type) {
        case ADD_HIT_FINISHED:
            if (!action.success) {
                break;
            }

            return state.concat(action.hit)
    }

    return state
}

function isLoadingReducer(state, action) {
    if (typeof state === 'undefined') {
        return false
    }

    switch (action.type) {
        case ADD_HIT_REQUESTED:
            return true
        case ADD_HIT_FINISHED:
            return false
    }

    return state
}

export const areaReducer = combineReducers({
    form: formReducer,
    hits: hitsReducer,
    isLoading: isLoadingReducer,
})

export default function Area() {
    const {isLoading, hits, form: {x, y, r}} = useSelector(state => state.area);

    const dispatch = useDispatch()

    const addPoint = () => {
        dispatch({type: ADD_HIT_REQUESTED})

        fakeAddHit(x.value, y.value, r.value).then(response => {
            if (response.code === 400) {
                dispatch({type: ADD_HIT_FINISHED, success: false, error: response.error})
            } else if (response.code === 200) {
                const hit = {x: x.value, y: y.value, r: r.value, doesHit: response.body.doesHit}
                dispatch({type: ADD_HIT_FINISHED, success: true, hit})
            } else {
                dispatch({type: ADD_HIT_FINISHED, success: false, error: {}})
            }
        }).catch(() => {
            dispatch({type: ADD_HIT_FINISHED, success: false, error: {}})
        })
    }


    function handleChangeX(event, x) {
        dispatch({type: X_CHANGED, x})
    }

    const handleChangeY = (event) => {
        dispatch({type: Y_CHANGED, y: event.target.value})
    }

    const handleChangeR = (event, r) => {
        dispatch({type: R_CHANGED, r})
    }

    return (
        <div>
            <canvas id="area" />
            <Autocomplete
                disablePortal
                disableClearable
                options={xOptions}
                getOptionLabel={val => val.toString()}
                value={x.value}
                onChange={handleChangeX}
                sx={{width: 300, marginBottom: 2}}
                renderInput={(params) => <TextField label="X" {...params} />}
            />

            <TextField
                sx={{width: 300, marginBottom: 2}}
                variant="outlined"
                value={y.value}
                label={y.validationMessage || "Y"}
                error={y.validationMessage !== null}
                onChange={handleChangeY}
            />

            <Autocomplete
                disablePortal
                disableClearable
                options={rOptions}
                getOptionLabel={val => val.toString()}
                sx={{width: 300, marginBottom: 2}}
                value={r.value}
                onChange={handleChangeR}
                renderInput={(params) => (
                    <TextField
                        label={r.validationMessage || "Radius"}
                        error={r.validationMessage !== null}
                        {...params}
                    />
                )}
            />
            <Button
                variant="outlined"
                onClick={addPoint}
                startIcon={isLoading ? <CircularProgress size={12} /> : null}
                disabled={isLoading}
            >
                Add point
            </Button>

            <Button variant="outlined" color="error" onClick={() => dispatch({type: LOGOUT_ACTION})}>Log out</Button>

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
