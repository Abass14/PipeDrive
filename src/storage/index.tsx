import AsyncStorage from "@react-native-async-storage/async-storage"
import { ACTIVITES, DEALS, PERSONS } from "../utils/constants"


export async function getCachedPersons() {
    const cachedData = await AsyncStorage.getItem(PERSONS)
    return JSON.parse(`${cachedData}`)
}

export async function getCachedActivities() {
    const cachedData = await AsyncStorage.getItem(ACTIVITES)
    return new Map(JSON.parse(`${cachedData}`))
}

export async function getCachedDeals() {
    const cachedData = await AsyncStorage.getItem(DEALS)
    return new Map(JSON.parse(`${cachedData}`))
}


export function fetchFromCacheNetwork (
    cachedData: any, 
    contextData: any, 
    cacheCallBack: Function, 
    contextCallBack: Function) {
        if (cachedData) {
            cacheCallBack()
            return;
        }
        
        if (contextData.length) return;
        contextCallBack()
}

export const cacheData = (data: any) : string => {
    return JSON.stringify(data)
}

export const getCachedData = (data: any) : any => {
    return JSON.parse(data);
}