import AsyncStorage from "@react-native-async-storage/async-storage"
import { ACTIVITES, DEALS, PERSONS } from "../utils/constants"


/**
 * Get person list from AsyncStorage
 * @returns Array<Person>
 */
export async function getCachedPersons() {
    const cachedData = await AsyncStorage.getItem(PERSONS)
    return JSON.parse(`${cachedData}`)
}

/**
 * Get activities from AsyncStorage
 * @returns Map<number, Array<Activities>>
 */
export async function getCachedActivities() {
    const cachedData = await AsyncStorage.getItem(ACTIVITES)
    return new Map(JSON.parse(`${cachedData}`))
}

/**
 * Get deals from AsyncStorage
 * @returns Map<number, Array<Deals>>
 */
export async function getCachedDeals() {
    const cachedData = await AsyncStorage.getItem(DEALS)
    return new Map(JSON.parse(`${cachedData}`))
}

/**
 * Acts as a data proxy to cache data. 
 * @param cachedData: any
 * @param contextData: any
 * @param cacheCallBack: function
 * @param contextCallBack: function
 * @returns void
 */
export function fetchFromCacheNetwork (
    cachedData: any, 
    contextData: any, 
    cacheCallBack: Function, 
    contextCallBack: Function) {
        if (cachedData) {
            cacheCallBack()
            return;
        }
        
        if (contextData?.length) return;
        contextCallBack()
}

/**
 * JSON stringifier
 * @param data 
 * @returns string
 */
export const cacheData = (data: any) : string => {
    return JSON.stringify(data)
}

/**
 * JSON parser
 * @param data 
 * @returns Object<any>
 */
export const getCachedData = (data: any) : any => {
    return JSON.parse(data);
}

/**
 * Clears AsyncStorage
 */
export const clearStorage = async () => {
    await AsyncStorage.clear()
}

/**
 * @asynchronous
 * Clears an object of key @params {key}
 * @param key: string 
 */
export const clearObject = async (key: string) => {
    await AsyncStorage.removeItem(key);
}

/**
 * @asynchronous
 * Sets an object of key @params {key}
 * @param key: string 
 * @param data: any
 */
export const setObject = async (key: string, data: any) => {
    await AsyncStorage.setItem(key, data)
}