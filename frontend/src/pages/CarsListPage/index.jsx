import Grid from "@mui/material/Grid";
import { BookingService } from "api/rest/services";
import CarCardItem from "components/CarsListPage/CarCardItem";
import Navbar from "components/common/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss"


export default function CarsListPage() {

    const { stateName, districtName } = useParams()
    const [cars, setCars] = useState([])

    useEffect(() => {
        BookingService.getCarsInDistrictAndState(stateName, districtName).then(cars => setCars(cars))
    }, [stateName, districtName])

    return (
        <div className="page" id="cars-list-page">
            <Navbar />
            <Grid className="cars-list" container>
                {cars.map(car => {
                    return (
                        <Grid key={car.carId} item xs={12} sm={5} md={3.5} lg={2.8} m="1em auto">
                            <CarCardItem car={car} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}
