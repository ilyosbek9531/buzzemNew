import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    token: '',
    patient: ''
}

export const { actions: authActions, reducer: authReducer } = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserId: (state, { payload }) => {
            state.userId = payload
        },
        setToken: (state, { payload }) => {
            state.token = payload
        },
        setAboutPatient: (state, { payload }) => {
            state.patient = payload
        },
        clearState() {
            return initialState
        },
    }
})