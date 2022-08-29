import axios from "axios";
import config from "../../config";
const { API_TOKEN_v2, BASE_URL_v2 } = config;

export const axiosInstance = axios.create({
    baseURL: BASE_URL_v2,
    params: {
        api_token: API_TOKEN_v2
    }
})

const API = async (method: "get" | "post", path: string, additionalParams?: any) => {
    switch (method) {
        case "get":
            try {
                const request = await axiosInstance.get(path, {
                    params: additionalParams
                })
                return request
            } catch (error: any) {
                throw error
            }
        case "post":
            try {
                const request = await axiosInstance.post(path, additionalParams)
                return request
            } catch (error: any) {
                throw error
            }
    }
}

export default API;

