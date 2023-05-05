import axios from "axios";
import { AuthConfig } from "config";


/**
 * Custom configured axios instance
 * @type {axios | null}
 */
export let AxiosInstance = null

/**
 * Initialize a new Axios instance and set it globally
 */
export function initAxiosInstance() {
    AxiosInstance = axios.create({
        headers: {
            authorization: `Bearer ${AuthConfig.getServerAuthToken()}`
        }
    })
}
