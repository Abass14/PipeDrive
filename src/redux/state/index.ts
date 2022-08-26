import { Activity, Deals, Person } from "../../model/model";

export interface State {
    personsList: Array<Person>,
    dealsList: Array<Deals>,
    activitiesList: Array<Activity>,
    activityMap: Map<number, Array<Activity>>,
    dealsMap: Map<number, Array<Deals>>,
    personListError: string,
    dealsListError: string,
    activitiesListError: string
}

export const initialState: State = {
    personsList: [] as Array<Person>,
    dealsList: [] as Array<Deals>,
    activitiesList: [] as Array<Activity>,
    personListError: "",
    dealsListError: "",
    activitiesListError: "",
    activityMap: new Map() as Map<number, Array<Activity>>,
    dealsMap: new Map() as Map<number, Array<Deals>>
}