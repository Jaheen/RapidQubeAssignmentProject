import { AppMailer } from "api/mail"
import { Bookings, Cars, States, Users } from "database/models"


/**
 * Service to perform logic related to car booking
 */
export default class BookingService {

    /**
     * Get all state names from database.
     * @returns a promise of array of strings
     */
    static async getIndianStates(): Promise<Array<string>> {
        return new Promise(resolve => {
            States.find({}, { districts: 0, _id: 0 }).then(districts => {

                const data: Array<string> = []
                districts.forEach(district => data.push(district.name))

                resolve(data)
            })
        })
    }

    /**
     * Get all districts of a state from database
     * @param stateName name of the state for which districts need to be found
     * @returns a promise containing array of districts
     */
    static async getDistricts(stateName: string): Promise<Array<string>> {
        return new Promise(resolve => {

            States.findOne({ name: stateName }, { districts: 1 }).then(state => {

                if (state) resolve(state.districts)
                else resolve([])
            })
        })
    }

    /**
     * Get all available cars in a state and district
     */
    static async getCars(stateName: string, districtName: string): Promise<Array<object>> {
        return new Promise((resolve, reject) => {
            Promise.all([
                Bookings.find({ state: stateName, district: districtName }),
                Cars.find({})
            ]).then(([bookings, cars]) => {
                const data = []
                cars.forEach(car => {
                    const carData = car.toJSON()
                    carData["carId"] = carData._id
                    delete carData._id
                    if (bookings.find(booking => booking.carId === car._id))
                        carData["isBooked"] = true
                    data.push(carData)
                })

                resolve(data)
            })
        })
    }

    /**
     * Get details of a car in a district in a state (ie whether it is booked or not or available for booking etc)
     * @param stateName name of state
     * @param districtName name of district
     * @param carId id of car
     * @returns 
     */
    static async getCarInfo(stateName: string, districtName: string, carId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Promise.all([
                Bookings.findOne({ state: stateName, district: districtName, carId }),
                Cars.findOne({ _id: carId })
            ]).then(([booking, car]) => {
                if (car) {
                    const carData = car.toJSON({})
                    if (booking)
                        carData["isBooked"] = true
                    carData["carId"] = carData._id
                    delete carData._id

                    resolve(carData)
                }
            })
        })
    }

    /**
     * Create booking and send email
     */
    static async bookCar(userId: string, stateName: string, districtName: string, carId: string, distance: number, payment: number, paymentType: string, remarks: string): Promise<any> {
        return new Promise((resolve) => {
            Bookings.create({ userId, state: stateName, district: districtName, carId, distance, payment, paymentType, remarks }).then(newBooking => {
                resolve(newBooking)
                Users.findOne({ _id: userId }).then(user => {
                    if (user) {
                        AppMailer.sendSimpleTextMail(
                            user.email,
                            "Congratulation your booking is confirmed happy travel",
                            `Dear ${user.firstName},\n\t we are happy to tell you that you've successfully rented out car in ${stateName} state's ${districtName}.`
                        )
                    }
                })
            })
        })
    }
}
