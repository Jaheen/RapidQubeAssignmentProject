import { Link, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AuthConfig } from "config";
import "./styles.scss"


export default function Navbar() {

    const avatarButtonRef = useRef(null)
    const { pathname } = useLocation()
    const user = useSelector(rootState => rootState.user.profile)
    const [sidenavOpen, setSidenavOpen] = useState(false)
    const [popoverMenuOpen, setPopoverMenuOpen] = useState(false)

    const logoutMenuItemClicked = () => {
        AuthConfig.deleteServerAuthToken()
        window.location.reload()
    }

    return (
        <Grid component="section" id="navbar" container alignItems="center" justifyContent="space-between" p={1} wrap="nowrap">
            <Grid item container xs={8} md={6} lg={3} alignItems="center" px={2}>
                <IconButton className="sidenav-trigger" onClick={() => setSidenavOpen(true)}>
                    <MenuIcon color="white" />
                </IconButton>
                <h2>Super Cars</h2>
            </Grid>
            <Grid item container justifyContent="flex-end" className="navbar__link-container">
                <Link to="/" className={`navbar__link ${pathname === "/" ? "active" : "inactive"}`}>Home</Link>
                <Link to="/todos" className={`navbar__link ${pathname === "/todos" ? "active" : "inactive"}`}>Todos</Link>
                <Link to="/car-booking" className={`navbar__link ${pathname.startsWith("/car-booking") ? "active" : "inactive"}`}>Car Booking</Link>
            </Grid>
            <Grid item container xs justifyContent="flex-end">
                <IconButton onClick={() => setPopoverMenuOpen(true)} ref={avatarButtonRef}>
                    <Avatar>{user.firstName.slice(0, 1)}</Avatar>
                </IconButton>

                <Popover className="account-menu" open={popoverMenuOpen} onClose={() => setPopoverMenuOpen(false)} anchorEl={avatarButtonRef.current} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} >
                    <h3 className="title">Hello Mr. {user.firstName}</h3>
                    <Divider />
                    <MenuItem onClick={logoutMenuItemClicked}>Logout</MenuItem>
                </Popover>

            </Grid>

            <Drawer className="sidenav" anchor="left" open={sidenavOpen} onClose={() => setSidenavOpen(false)}>
                <Grid className="header" container alignItems="center">
                    <IconButton onClick={() => setSidenavOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <h2 className="header__title">Hi Mr. {user.firstName}</h2>
                </Grid>
                <Grid className="links" container direction="column">
                    <Link to="/" className={`sidenav__link ${pathname === "/" ? "active" : "inactive"}`}>Home</Link>
                    <Link to="/todos" className={`sidenav__link ${pathname === "/todos" ? "active" : "inactive"}`}>Todos</Link>
                    <Link to="/car-booking" className={`sidenav__link ${pathname.startsWith("/car-booking") ? "active" : "inactive"}`}>Car Booking</Link>
                </Grid>
            </Drawer>
        </Grid>
    )
}
