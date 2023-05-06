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


export default function SignupPage() {

    const [firstName, setFirstName] = useState({ value: "", error: false, helperText: "" })
    const [lastName, setLastName] = useState({ value: "" })
    const [email, setEmail] = useState({ value: "", error: false, helperText: "" })
    const [password, setPassword] = useState({ value: "", error: false, helperText: "" })
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: false, helperText: "" })
    const [snackbar, setSnackbar] = useState({ open: false, message: "" })

    const onSignupButtonPressed = () => {
        if (firstName.value.trim() !== "") {
            if (/.*@.*\.*/.test(email.value)) {
                if (password.value.trim() !== "") {
                    if (password.value === confirmPassword.value) {
                        AuthService.signup(firstName.value, lastName.value, email.value, password.value).then(token => {
                            AuthConfig.setServerAuthToken(token)
                            window.location.reload()
                        }).catch(reason => setSnackbar({ open: true, message: reason }))
                    } else {
                        setPassword({ value: password.value, error: true, helperText: "passwords don't match" })
                        setConfirmPassword({ value: confirmPassword.value, error: true, helperText: "passwords don't match" })
                    }
                } else
                    setPassword({ value: password.value, error: true, helperText: "please enter the password" })
            } else
                setEmail({ value: email.value, error: true, helperText: "please enter a valid email" })
        } else
            setFirstName({ value: firstName.value, error: true, helperText: "first name can't be empty" })
    }

    return (
        <Grid className="page" id="signup-page" container justifyContent="center" alignItems="center">

            <Grid className="auth-form__container" item container xs={10} sm={8} md={6} lg={4}>

                <Paper className="signup-form auth-form">
                    <h1 className="auth-form__title">Sign Up</h1>
                    <Grid container wrap="nowrap" spacing={1}>
                        <Grid item xs>
                            <TextField className="auth-form__field" variant="outlined" fullWidth label="First name" type="text"
                                value={firstName.value} error={firstName.error} helperText={firstName.helperText}
                                onChange={(ev) => setFirstName({ value: ev.target.value, error: false, helperText: "" })} />
                        </Grid>
                        <Grid item xs>
                            <TextField className="auth-form__field" variant="outlined" fullWidth label="Last name" type="text"
                                value={lastName.value} onChange={(ev) => setLastName({ value: ev.target.value })} />
                        </Grid>
                    </Grid>

                    <TextField className="auth-form__field" variant="outlined" fullWidth label="Email" type="email"
                        value={email.value} error={email.error} helperText={email.helperText}
                        onChange={(ev) => setEmail({ value: ev.target.value, error: false, helperText: "" })} />

                    <TextField className="auth-form__field" variant="outlined" fullWidth label="Password" type="password"
                        value={password.value} error={password.error} helperText={password.helperText}
                        onChange={(ev) => setPassword({ value: ev.target.value, error: false, helperText: "" })} />

                    <TextField className="auth-form__field" variant="outlined" fullWidth label="Re-enter Password" type="password"
                        value={confirmPassword.value} error={confirmPassword.error} helperText={confirmPassword.helperText}
                        onChange={(ev) => setConfirmPassword({ value: ev.target.value, error: false, helperText: "" })} />

                    <Button className="auth-form__action-button" variant="contained" fullWidth onClick={onSignupButtonPressed}>Sign Up</Button>

                    <Link to="/login">Already have an account? Login</Link>
                </Paper>

            </Grid>

            <Snackbar open={snackbar.open} autoHideDuration={3000} anchorOrigin={{ horizontal: "right", vertical: "top" }}
                message={snackbar.message} onClose={() => setSnackbar({ open: false, message: "" })} />
        </Grid>
    )
}
