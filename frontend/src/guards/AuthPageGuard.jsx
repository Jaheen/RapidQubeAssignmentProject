import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

/**
 * Auth page guard will render page only if not authenticated
 * To be used with pages like login signup etc.
 */
export default function AuthPageGuard(props) {

    const { page } = props
    const user = useSelector(rootState => rootState.user)

    if (!user.isAuthenticated)
        return page
    else
        return <Navigate to="/" />
}