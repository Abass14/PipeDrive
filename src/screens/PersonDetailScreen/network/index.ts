import API from "../../../api/API"

export const getPersonDetails = async (id: number) => {
    const request = await API("get", `persons/${id}`)
    return request;
}

export const getPersonActivities = async (id: number) => {
    const request = await API("get", `persons/${id}/activities`)
    return request;
}

export const getPersonDeals = async (id: number) => {
    const request = await API("get", `persons/${id}/deals`)
    return request;
}