import { NavigationProp, Route } from "@react-navigation/native"
import { State } from "../redux/state"

export type GET_PERSONS = "GET_PERSONS"
export type REFRESH_PERSONS = "REFRESH_PERSONS"
export type GET_PERSONS_FROM_CONTEXT = "GET_PERSONS_FROM_CONTEXT"
export type GET_ACTIVITIES = "GET_ACTIVITIES"
export type GET_DEALS = "GET_DEALS"
export type GET_PERSON_ERROR = "GET_PERSON_ERROR"
export type GET_ACTIVITIES_ERROR = "GET_ACTIVITIES_ERROR"
export type GET_DEALS_ERROR = "GET_DEALS_ERROR"
export type GET_ACTIVITIES_FROM_CONTEXT = "GET_ACTIVITIES_FROM_CONTEXT"
export type GET_DEALS_FROM_CONTEXT = "GET_DEALS_FROM_CONTEXT"
export type PersonDetailScreenProps = {
    appState: State,
    fetchPersons: Function,
    fetchPersonActivities: Function,
    fetchPersonDeals: Function,
    fetchPersonActivitiesFromContext: Function,
    fetchPersonDealsFromContext: Function,
    route: Route<any, any>,
    navigation: NavigationProp<any, any>,
}
export type PersonListScreenProps = {
    navigation: NavigationProp<any, any>,
    fetchPersons: Function,
    fetchPersonsFromContext: Function,
    appState: State
}
