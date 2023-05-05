import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DialogActions from "@mui/material/DialogActions";
import { BookingService } from "api/rest/services";
import Navbar from "components/common/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.scss"


export default function CarDetailsPage() {

    const navigate = useNavigate()
    const { stateName, districtName, carId } = useParams()
    const [details, setDetails] = useState(null)
    const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
    const [distance, setDistance] = useState("")
    const [payment, setPayment] = useState("")
    const [paymentType, setPaymentType] = useState("")
    const [remarks, setRemarks] = useState("")

    const onConfirmBookingClicked = () => {
        BookingService.bookCar(stateName, districtName, carId, distance, payment, paymentType, remarks).then(_ => navigate("/car-booking/thankyou"))
    }

    const onCancelBookingClicked = () => {
        setBookingDialogOpen(false)
        setConfirmationDialogOpen(false)
        setDistance(0)
        setPayment(0)
        setPaymentType("")
        setRemarks("")
    }

    useEffect(() => {
        BookingService.getCarInfoInDistrictAndState(stateName, districtName, carId).then(details => setDetails(details))
    }, [stateName, districtName, carId])

    return (
        <div className="page" id="car-details-page">
            <Navbar />
            {details !== null ? (
                <Grid className="car-data-container" container justifyContent="center">

                    {/* Details section */}
                    <Grid component={Paper} className="car-data" container direction="column" item xs={10} md={6} lg={4}>
                        <img src={details.image} alt="" className="car__image" />
                        <h2 className="car__name">{details.name}</h2>
                        <span>Features :</span>
                        <p className="car__features">{details.features}</p>

                        <span>Price :</span>
                        <p className="car__price">Rs {details.price}</p>

                        <span>Fuel Economy :</span>
                        <p className="car__mileage">{details.mileage} KMPL</p>

                        <p className={`car__availability ${details.isBooked ? "unavailable" : "available"}`}>
                            {details.isBooked ? "UnAvailable" : "Available"}
                        </p>

                        <Button variant="contained" disabled={details.isBooked} onClick={() => setBookingDialogOpen(true)}>Book Car</Button>
                    </Grid>

                    {/* Booking dialog */}
                    <Dialog className="dialog" open={bookingDialogOpen}>
                        <div className="dialog-header" onClick={() => setBookingDialogOpen(false)}>
                            <IconButton>
                                <CloseIcon />
                            </IconButton>
                            <h2 className="header__title">Booking</h2>
                        </div>

                        <div className="booking-form">
                            <input value={distance} onChange={(ev) => setDistance(ev.target.value)} type="number" placeholder="Total distance in KM" />
                            <input value={payment} onChange={(ev) => setPayment(ev.target.value)} type="number" placeholder="Payment in Rs" />
                            <input value={paymentType} onChange={(ev) => setPaymentType(ev.target.value)} type="text" placeholder="Payment Type" />
                            <input value={remarks} onChange={(ev) => setRemarks(ev.target.value)} type="text" placeholder="Remarks" />
                            <Button variant="contained" fullWidth onClick={() => setConfirmationDialogOpen(true)}>Book</Button>
                        </div>
                    </Dialog>

                    {/* Confirmation Dialog */}
                    <Dialog className="dialog" open={confirmationDialogOpen}>
                        <div className="dialog-header">
                            <IconButton onClick={() => setConfirmationDialogOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                            <h2 className="header__title">Confirm Booking</h2>
                        </div>
                        <span className="dialog-message">
                            Are you sure you want to book this car with all the details you provided?
                        </span>
                        <DialogActions>
                            <Button onClick={onCancelBookingClicked}>Cancel</Button>
                            <Button variant="contained" onClick={onConfirmBookingClicked}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            ) : null}
        </div>
    )
}
