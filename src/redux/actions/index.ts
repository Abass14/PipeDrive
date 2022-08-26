import { Dispatch } from "react";
import { Activity, Deals, Person } from "../../model/model";
import { getPersonActivities, getPersonDeals } from "../../screens/PersonDetailScreen/network";
import { getPersons } from "../../screens/PersonListScreen/network";
import { GET_ACTIVITIES, GET_ACTIVITIES_ERROR, GET_ACTIVITIES_FROM_CONTEXT, GET_DEALS, GET_DEALS_ERROR, GET_DEALS_FROM_CONTEXT, GET_PERSONS, GET_PERSONS_FROM_CONTEXT, GET_PERSON_ERROR, REFRESH_PERSONS } from "../../utils/types";
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

export interface GetPersonActionFromContext {
    readonly type: GET_PERSONS_FROM_CONTEXT;
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

export type Action = GetPersonAction | GetPersonError | GetPersonActionFromContext | RefreshPersonAction | GetActivitiesAction | GetActivitiesError | GetDealsActions | GetDealsError | GetActivitiesFromContext | GetDealsActionsContext;

export const fetchPersons = (start: number, limit: number, refresh: boolean): Array<Person> | any => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await getPersons(start, limit);
            await AsyncStorage.removeItem(PERSONS);
            const { data = {} } = response;
            if (refresh) {
                dispatch({
                    type: "REFRESH_PERSONS",
                    payload: data.data
                })
            } else {
                dispatch({
                    type: "GET_PERSONS",
                    payload: data.data
                })
            }
        } catch (error: any) {
            const { message = "Something went wrong" } = error
            console.log(JSON.stringify(error), "axios response error")
            // const { error_info = "Something went wrong" } = response;
            dispatch({
                type: "GET_PERSON_ERROR",
                payload: `${message} Swipe to refresh`
            })
        }
    }
}

export const fetchPersonsFromContext = (): Array<Person> | any => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const response = await getCachedPersons();
            dispatch({
                type: "GET_PERSONS_FROM_CONTEXT",
                payload: response
            })
        } catch (error: any) {
            const { response = {} } = error
            console.log(response, "response error")
            dispatch({
                type: "GET_PERSON_ERROR",
                payload: `Swipe to refresh`
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
            console.log(error, "<===activities error")
            const { error_info = "Error fetching Activities." } = error
            dispatch({
                type: "GET_ACTIVITIES_ERROR",
                payload: `${error_info}`
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
            console.log(error, "<===activities from context error")
            const { error_info = "Error fetching Activities." } = error
            dispatch({
                type: "GET_ACTIVITIES_ERROR",
                payload: `${error_info}`
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
            console.log(error, "<===deals error")
            const { error_info = "Error fetching Deals." } = error
            dispatch({
                type: "GET_DEALS_ERROR",
                payload: `${error_info}`
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
            console.log(error, "<===deals from context error")
            const { error_info = "Error fetching Deals." } = error
            dispatch({
                type: "GET_DEALS_ERROR",
                payload: `${error_info}`
            })
        }
    }
}