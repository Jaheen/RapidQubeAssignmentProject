import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { BookingService } from "services";


/**
 * Controller to handle request related to bookings
 */
export default class BookingController {

    static async getIndianStates(req: Request, res: Response) {
        BookingService.getIndianStates().then(states => res.json({ states }))
    }

    static async getDistrictsOfState(req: Request, res: Response) {
        const { stateName } = req.params

        if (typeof stateName === "string" && stateName.trim() !== "")
            BookingService.getDistricts(stateName).then(districts => res.json({ districts }))
    }

    static async getCars(req: Request, res: Response) {
        const { stateName, districtName } = req.params

        if (stateName.trim() !== "" && districtName.trim() !== "")
            BookingService.getCars(stateName, districtName).then(cars => res.json({ cars }))
    }

    static async getCarDetails(req: Request, res: Response) {
        const { stateName, districtName, carId } = req.params
        
        if (stateName.trim() !== "" && districtName.trim() !== "", isValidObjectId(carId))
            BookingService.getCarInfo(stateName, districtName, carId).then(carData => res.json({ car: carData }))
    }

    static async bookCar(req: Request, res: Response) {
        const userId = req["userId"]
        const { stateName, districtName, carId, distance, payment, paymentType, remarks } = req.body

        if (stateName.trim() !== "" && districtName.trim() !== "", isValidObjectId(carId))
            BookingService.bookCar(userId, stateName, districtName, carId, distance, payment, paymentType, remarks)
                .then(newBooking => res.json({ message: "success", booking: newBooking }))
    }
}
