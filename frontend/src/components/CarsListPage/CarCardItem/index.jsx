import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link, useParams } from "react-router-dom";
import "./styles.scss"


export default function CarCardItem(props) {

    const { car: { carId, name, price, features, image, mileage, isBooked } } = props
    const { stateName, districtName } = useParams()

    return (
        <Link className="car-card-item" to={`/car-booking/cars/${stateName}/${districtName}/${carId}`}>
            <Card className="car-card">
                <CardMedia component="img" image={image} title={name} />
                <CardContent className="car-card__details">
                    <h3 className="car__name">{name}</h3>
                    <p className="car__features">{features}</p>
                    <p className="car__price">Price {'->'} Rs{price}/KM</p>
                    <p className="car__mileage">Fuel Economy {'->'} {mileage} KM/L</p>
                    <p style={{ color: "red" }}>{isBooked ? "Unavailable" : "Available"}</p>
                </CardContent>
            </Card>
        </Link>
    )
}
