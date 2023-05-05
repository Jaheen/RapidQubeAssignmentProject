import CircularProgress from "@mui/material/CircularProgress"
import { initAxiosInstance } from "api/rest/axios"
import { AuthConfig } from "config"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserReducerThunks } from "store/user-reducer"
import "./styles.scss"

/**
 * Splash Screen to show till the authentication is verified from the server
 */
export default function SplashScreenPage(props) {

    const { onClose } = props
    const dispatch = useDispatch()

    useEffect(() => {
        const token = AuthConfig.getServerAuthToken()
        if (token !== "")
            dispatch(UserReducerThunks.verifyTokenAndFetchLoggedUser({ token })).then(user => {
                initAxiosInstance()
                console.log(user)
                onClose()
            }).catch(reason => {
                console.log(reason)
                AuthConfig.deleteServerAuthToken()
                onClose()
            })
        else
            onClose()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="page" id="splash-screen-page">
            <CircularProgress variant="indeterminate" />
        </div>
    )
}