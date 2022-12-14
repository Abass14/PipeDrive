import { Action } from "../actions";
import { initialState, State } from "../state";
import { ACTIVITES, DEALS, PERSONS } from "../../utils/constants";
import { cacheData, setObject } from "../../storage";


const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case "GET_PERSONS":
            if (!action.payload) return {
                ...state,
                personListError: ""
            }
            setObject(PERSONS, cacheData([...state.personsList, ...action.payload]))
            return {
                ...state,
                personListError: ""
            };
        case "GET_PERSONS_FROM_CONTEXT": 
            return {
                ...state,
                personsList: action.payload,
            }
        case "GET_PERSON_ERROR":
            return {
                ...state,
                personListError: action.payload
            }
        case "REFRESH_PERSONS":
            setObject(PERSONS, cacheData(action.payload))
            return {
                ...state,
                personListError: ""
            }
        case "GET_ACTIVITIES":
            const map = state.activityMap.set(action.payload.id, action.payload.activity)
            setObject(ACTIVITES,  JSON.stringify(Array.from(map.entries())))
            return {
                ...state,
                activitiesListError: ""
            }
        case "GET_ACTIVITIES_FROM_CONTEXT":
            return {
                ...state,
                activityMap: action.payload,
            }
        case "GET_ACTIVITIES_ERROR":
            return {
                ...state,
                activitiesListError: action.payload
            }
        case "GET_DEALS":
            const mapDeals = state.dealsMap.set(action.payload.id, action.payload.deals)
            setObject(DEALS, JSON.stringify(Array.from(mapDeals.entries())))
            return {
                ...state,
                dealsListError: ""
            };
        case "GET_DEALS_FROM_CONTEXT":
            return {
                ...state,
                dealsMap: action.payload
            }
        case "GET_DEALS_ERROR":
            return {
                ...state,
                dealsListError: action.payload
            }
        default:
            return state;
    }
}

export type ApplicationState = ReturnType<typeof reducer>;
export default reducer;