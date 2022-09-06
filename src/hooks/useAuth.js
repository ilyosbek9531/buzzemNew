import { useDispatch, useSelector } from "react-redux"
import { authActions } from "store/auth/auth.slice"


const useAuth = () => {
    const userId = useSelector(state => state.auth.userId)
    const token = useSelector(state => state.auth.token)
    const patient = useSelector(state => state.auth.patient)
    const dispatch = useDispatch()

    const setToken = (token) => {
        dispatch(authActions.setToken(token))
    }

    const setUserId = (userId) => {
        dispatch(authActions.setUserId(userId))
    }

    const setAboutPatient = (patient) => {
        dispatch(authActions.setAboutPatient(patient))
    }

    const setLogout = () => {
        dispatch(authActions.clearState())
    }

    return { userId, token, patient, setToken, setUserId, setLogout, setAboutPatient }
}

export default useAuth