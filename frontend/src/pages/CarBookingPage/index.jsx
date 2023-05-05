import Navbar from "components/common/Navbar";
import BookingMainImage from "assets/images/booking-page-main.png"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { BookingService } from "api/rest/services";
import "./styles.scss"
import { useNavigate } from "react-router-dom";



export default function CarBookingPage() {

    const navigate = useNavigate()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [states, setStates] = useState([])
    const [districts, setDistricts] = useState([])
    const [selectedState, setSelectedState] = useState("")
    const [selectedDistrict, setSelectedDistrict] = useState("")

    const onStateSelected = (ev) => {
        const state = ev.target.value

        setSelectedState(state)
        setDistricts([])
        setSelectedDistrict("")

        BookingService.getDistrictsOfState(state).then(districts => setDistricts(districts))
    }

    const onCloseButtonClicked = () => {
        setDialogOpen(false)
        setSelectedState("")
        setSelectedDistrict("")
        setDistricts([])
    }

    const onSearchButtonClicked = () => {
        if (selectedState !== "" && selectedDistrict !== "") {
            navigate(`/car-booking/cars/${selectedState}/${selectedDistrict}`)
        }
    }

    useEffect(() => {
        BookingService.getIndianStates().then(states => setStates(states))
    }, [])

    return (
        <div className="page" id="car-booking-page">
            <Navbar />
            <div className="main">
                <img className="main__image" src={BookingMainImage} alt="cars" />
                <p className="main__message">Want to book a car?</p>
                <Button className="main__action-button" variant="contained" disableElevation onClick={() => setDialogOpen(true)}>Book Now</Button>
            </div>

            <Dialog id="booking-detail-picker" className="detail-picker" open={dialogOpen}>
                <Grid className="dialog-header" container wrap="nowrap" alignItems="center">
                    <IconButton onClick={onCloseButtonClicked}>
                        <CloseIcon />
                    </IconButton>
                    <h1 className="header__title">Select state and district</h1>
                </Grid>

                <Grid className="detail-form" container>

                    <Grid className="form__field-container" item xs={12} my={2}>
                        <h4 className="form__field-title">Select your state</h4>
                        <Select value={selectedState} onChange={onStateSelected} fullWidth disabled={states.length === 0}>
                            {states.map(state => {
                                return <MenuItem key={state} value={state}>{state}</MenuItem>
                            })}
                        </Select>
                    </Grid>

                    <Grid className="form__field-container" item xs={12} my={2}>
                        <h4 className="form__field-title">Select your district</h4>
                        <Select value={selectedDistrict} onChange={(ev) => setSelectedDistrict(ev.target.value)} fullWidth disabled={districts.length === 0}>
                            {districts.map(state => {
                                return <MenuItem key={state} value={state}>{state}</MenuItem>
                            })}
                        </Select>
                    </Grid>

                    <Button className="form__action-button" variant="contained" fullWidth disabled={selectedDistrict === ""} onClick={onSearchButtonClicked}>Search Cars</Button>

                </Grid>
            </Dialog>
        </div>
    )
}
