import { AxiosInstance } from "../axios"

/**
 * Class to make requests regarding Bookings
 */
export default class BookingService {

    /**
     * Get the states of india from server
     * @returns a promise containg array of indian state names
     */
    static async getIndianStates() {
        return new Promise((resolve, reject) => {
            AxiosInstance.get("/api/booking/getIndianStates").then(response => {
                const { status, data } = response
                if (status === 200) {
                    const { states } = data
                    resolve(states)
                }
            }).catch(console.log)
        })
    }

    /**
     * Get all districts of a particular state
     * @param {string} stateName name of the state for which districts need to be found
     * @returns a promise containing array of districts of the state
     */
    static async getDistrictsOfState(stateName) {
        return new Promise((resolve, reject) => {
            AxiosInstance.get(`/api/booking/getDistricts/${stateName}`).then(response => {
                const { status, data } = response
                if (status === 200) {
                    const { districts } = data
                    resolve(districts)
                }
            }).catch(console.log)
        })
    }

    /**
     * Find all cars in a district of a state
     * @param {string} stateName name of the state in which available cars need to be found
     * @param {string} districtName name of the district in which cars need to be found
     */
    static async getCarsInDistrictAndState(stateName, districtName) {
        return new Promise(resolve => {
            AxiosInstance.get(`/api/booking/cars/getCars/${stateName}/${districtName}`).then(response => {
                const { status, data } = response
                if (status === 200)
                    resolve(data.cars)
            })
        })
    }

    /**
     * Find details about a particular car in a district in a state
     * @param {string} stateName state name on which to search
     * @param {string} districtName district in which to search
     * @param {string} carId id of the car that needs to be fetched
     */
    static async getCarInfoInDistrictAndState(stateName, districtName, carId) {
        return new Promise((resolve) => {
            AxiosInstance.get(`/api/booking/cars/${stateName}/${districtName}/${carId}`).then(response => {
                const { status, data } = response
                if (status === 200)
                    resolve(data.car)
            })
        })
    }

    /**
     * Book the car on the server
     * @param {string} stateName name of state in which car is to be booked
     * @param {string} districtName name of the district in which car is to be booked
     * @param {string} carId id of the car
     * @param {number} distance distance for which the car is rented
     * @param {number} payment payment paid for the travel
     * @param {string} paymentType type of payment
     * @param {remarks} remarks  any other remarks
     */
    static async bookCar(stateName, districtName, carId, distance, payment, paymentType, remarks) {
        return new Promise(resolve => {
            AxiosInstance.post("/api/booking/bookCar", { stateName, districtName, carId, distance, payment, paymentType, remarks }).then(response => {
                const { data, status } = response
                if (status === 200 && data.message === "success")
                    resolve(data)
            })
        })
    }
}