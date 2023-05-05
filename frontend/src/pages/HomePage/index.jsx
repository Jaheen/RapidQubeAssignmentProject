import { useNavigate } from "react-router-dom";
import Navbar from "components/common/Navbar";
import Button from "@mui/material/Button";
import HomePageMainImage from "assets/images/homepage-main.webp"
import "./styles.scss"


/**
 * Home page component
 */
export default function HomePage() {

    const navigate = useNavigate()

    return (
        <div className="page" id="homepage">
            <Navbar />

            <div className="main">
                <img src={HomePageMainImage} alt="Cars" className="main__image" />
                <div className="main-container">
                    <h1 className="main__title">Welcome to Cars booking</h1>
                    <p className="main__excerpt">
                        Our taxi offers the best flat rates to its valuable customers, from virtually every zone.
                        So far we has been always a cost-effective mode of transportation for its customers and will continue to do so.
                        The all new cab booking app from our company will make your travel customizations easier than ever before.
                    </p>
                    <Button className="main__action" variant="contained" disableElevation onClick={() => navigate("/car-booking")}>Book Now</Button>
                </div>
            </div>
        </div>
    )
}
