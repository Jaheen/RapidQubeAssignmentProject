import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

/**
 * Protected page guard will render page only if authenticated
 * If not authenticated will redirect to login route
 */
export default function ProtectedPageGuard(props) {

    const { page } = props

    const user = useSelector(rootState => rootState.user)

    if (user.isAuthenticated)
        return page
    else
        return <Navigate to="/login" />
}