import { Dispatch } from "react";
import { Activity, Deals, Person } from "../../model/model";
import { getPersonActivities, getPersonDeals } from "../../screens/PersonDetailScreen/network";
import { getPersons } from "../../screens/PersonListScreen/network";
import { GET_ACTIVITIES, GET_ACTIVITIES_ERROR, GET_ACTIVITIES_FROM_CONTEXT, GET_DEALS, GET_DEALS_ERROR, GET_DEALS_FROM_CONTEXT, GET_PERSONS, GET_PERSON_ERROR, REFRESH_PERSONS } from "../../utils/types";
import { cacheData, getCachedActivities, getCachedDeals, getCachedPersons } from "../../storage";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PERSONS } from "../../utils/constants";

export interface GetPersonAction {
    readonly type: GET_PERSONS;
    payload: Array<Person> | Array<any>
}

export interface RefreshPersonAction {
    readonly type: REFRESH_PERSONS;
    payload: Array<Person> | Array<any>
}

export interface GetPersonError {
    readonly type: GET_PERSON_ERROR;
    payload: any
}



export interface GetActivitiesAction {
    readonly type: GET_ACTIVITIES;
    payload: { id: number, activity: Array<Activity> }
}

export interface GetActivitiesFromContext {
    readonly type: GET_ACTIVITIES_FROM_CONTEXT;
    payload: any
}

export interface GetActivitiesError {
    readonly type: GET_ACTIVITIES_ERROR;
    payload: any
}

export interface GetDealsActions {
    readonly type: GET_DEALS;
    payload: { id: number, deals: Array<Deals> }
}

export interface GetDealsActionsContext {
    readonly type: GET_DEALS_FROM_CONTEXT;
    payload: any
}

export interface GetDealsError {
    readonly type: GET_DEALS_ERROR;
    payload: any
}

export type Action = GetPersonAction | GetPersonError | RefreshPersonAction | GetActivitiesAction | GetActivitiesError | GetDealsActions | GetDealsError | GetActivitiesFromContext | GetDealsActionsContext;

export const fetchPersons = (start: number, limit: number, refresh: boolean): Array<Person> | any => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await getPersons(start, limit);
            const { data = {} } = response;
            // const cached = await getCachedPersons();
            // AsyncStorage.setItem(PERSONS, cacheData(data.data))
            if (refresh) {
                console.log("....refreshing")
                dispatch({
                    type: "REFRESH_PERSONS",
                    payload: data.data
                })
            } else {
                console.log("....not refreshing")
                dispatch({
                    type: "GET_PERSONS",
                    payload: data.data
                })
            }
            return data.data
        } catch (error: any) {
            const { error_info = "Something went wrong, try again" } = error
            dispatch({
                type: "GET_PERSON_ERROR",
                payload: error_info
            })
        }
    }
}

export const fetchPersonActivities = (id: number) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await getPersonActivities(id);
            const { data = {} } = response;
            dispatch({
                type: "GET_ACTIVITIES",
                payload: { id, activity: data.data }
            })
        } catch (error: any) {
            const { error_info = "Something went wrong, try again" } = error
            dispatch({
                type: "GET_ACTIVITIES_ERROR",
                payload: error_info
            })
        }
    }
}

export const fetchPersonActivitiesFromContext = () => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await getCachedActivities();
            dispatch({
                type: "GET_ACTIVITIES_FROM_CONTEXT",
                payload: response
            })
        } catch (error: any) {
            const { error_info = "Something went wrong, try again" } = error
            dispatch({
                type: "GET_ACTIVITIES_ERROR",
                payload: error_info
            })
        }
    }
}
export const fetchPersonDeals = (id: number) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await getPersonDeals(id);
            const { data = {} } = response;
            dispatch({
                type: "GET_DEALS",
                payload: { id: id, deals: data.data }
            })
        } catch (error: any) {
            const { error_info = "Something went wrong, try again" } = error
            dispatch({
                type: "GET_DEALS_ERROR",
                payload: error_info
            })
        }
    }
}

export const fetchPersonDealsFromContext = () => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await getCachedDeals()
            dispatch({
                type: "GET_DEALS_FROM_CONTEXT",
                payload: response
            })
        } catch (error: any) {
            const { error_info = "Something went wrong, try again" } = error
            dispatch({
                type: "GET_DEALS_ERROR",
                payload: error_info
            })
        }
    }
}