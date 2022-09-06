import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalShow: false,
    currentStep: 1,
    stepsData: {}
}

export const { actions: appointmentActions, reducer: appointmentReducer } = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setCurrentStep(state, { payload }) {
            state.currentStep = payload
        },
        setStepData(state, { payload: { stepNumber, data } }) {
            state.stepsData[stepNumber] = data
        },
        clearState() {
            return initialState
        },
        rejectAppointment(state, { payload }) {
            state.modalShow = payload
        }
    }
})