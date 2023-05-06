import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import { useState } from "react"
import { AuthService } from "api/rest/services"
import { AuthConfig } from "config"
import { Link } from "react-router-dom"
import "./styles.scss"


export default function LoginPage() {

    const [email, setEmail] = useState({ value: "", error: false, helperText: "" })
    const [password, setPassword] = useState({ value: "", error: false, helperText: "" })
    const [snackbar, setSnackbar] = useState({ open: false, message: "" })

    const onLoginButtonPressed = () => {
        if (/.*@.*\.*/.test(email.value)) {
            if (password.value.trim() !== "") {
                AuthService.login(email.value, password.value).then(token => {
                    AuthConfig.setServerAuthToken(token)
                    window.location.reload()
                }).catch(reason => setSnackbar({ open: true, message: reason }))
            } else
                setPassword({ value: password.value, error: true, helperText: "Please enter password" })
        } else
            setEmail({ value: email.value, error: true, helperText: "Please enter a valid email" })
    }

    return (
        <Grid className="page" id="login-page" container justifyContent="center" alignItems="center">

            <Grid className="auth-form__container" item container xs={10} sm={8} md={6} lg={4}>

                <Paper className="login-form auth-form">

                    <h1 className="auth-form__title">Login</h1>

                    <TextField className="auth-form__field" variant="outlined" fullWidth label="Email" type="email"
                        value={email.value} error={email.error} helperText={email.helperText}
                        onChange={(ev) => setEmail({ value: ev.target.value, error: false, helperText: "" })} />

                    <TextField className="auth-form__field" variant="outlined" fullWidth label="Password" type="password"
                        value={password.value} error={password.error} helperText={password.helperText}
                        onChange={(ev) => setPassword({ value: ev.target.value, error: false, helperText: "" })} />

                    <Button className="auth-form__action-button" variant="contained" fullWidth onClick={onLoginButtonPressed}>Login</Button>

                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </Paper>

            </Grid>

            <Snackbar open={snackbar.open} autoHideDuration={3000} anchorOrigin={{ horizontal: "right", vertical: "top" }}
                message={snackbar.message} onClose={() => setSnackbar({ open: false, message: "" })} />

        </Grid>
    )
}
