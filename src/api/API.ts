import axios from "axios";
import config from "../../config";
const {BASE_URL, API_TOKEN} = config;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_token: API_TOKEN
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
                return error.response;
            }
        case "post":
            try {
                const request = await axiosInstance.post(path, additionalParams)
                return request
            } catch (error: any) {
                throw error
                return error.response;
            }
    }
}

export default API;

