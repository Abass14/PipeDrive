import API from "../../../api/API"

export const getPersons = async (start: number, limit: number) => {
    const response = await API("get", "persons", {
        start,
        limit
    })
    return response;
}

