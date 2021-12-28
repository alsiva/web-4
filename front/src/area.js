import './area.css';
import React from 'react';
import {Autocomplete, Button, CircularProgress, Stack, TextField} from '@mui/material';
import {combineReducers} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_FINISHED_ACTION, LOGOUT_ACTION} from "./login";
import {Chart} from "./chart";

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
        return 5
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
        return []
    }

    switch (action.type) {
        case LOGIN_FINISHED_ACTION:
            if (action.success) {
                return action.hits;
            }
            break;
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
        case LOGOUT_ACTION:
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

export async function addPoint(dispatch, x, y, r) {
    dispatch({type: ADD_HIT_REQUESTED})

    const response = await fetch(
        '/hits',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({x, y, r}),
            credentials: 'same-origin'
        }
    )

    if (response.status === 401) {
        dispatch({type: LOGOUT_ACTION, initiatedByUser: false})
        return;
    }

    const json = await response.json()
    if (response.status === 400) {
        dispatch({type: ADD_HIT_FINISHED, success: false, error: json})
        return
    }

    dispatch({type: ADD_HIT_FINISHED, success: true, hit: json })
}

export default function Area() {
    const {isLoading, hits, form: {x, y, r}} = useSelector(state => state.area);

    const dispatch = useDispatch()

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
        <div className="container">
            <Chart />
            <div className="form">
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
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            addPoint(dispatch, x.value, y.value, r.value)
                        }}
                        startIcon={isLoading ? <CircularProgress size={12} /> : null}
                        disabled={isLoading}
                    >
                        Add point
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={async () => {
                            const response = await fetch('/logout', {
                                method: 'POST',
                                headers: {
                                    'X-Requested-With': 'XMLHttpRequest',
                                },
                            })

                            if (200 <= response.status && response.status < 300) {
                                dispatch({type: LOGOUT_ACTION, initiatedByUser: true});
                            }
                        }}
                    >
                        Log out
                    </Button>
                </Stack>
            </div>

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
                {hits.map(hit => (
                    <tr key={hit.id}>
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
