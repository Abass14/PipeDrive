import { Person } from "../model/model";
import { avatar } from "./constants";

/**
 * Finds and returns person of @params {id} in @params {userList} and returns person 
 * @param id 
 * @param userList 
 * @returns Person | undefined
 */
export function getUserDetails(id: number, userList: Array<Person | any>): Person | any {
    const user = userList?.find((user) => id === user?.id)
    return user
}

/**
 * Gets and return a concatenated first name and last name of @params {person}
 * @param person 
 * @returns string
 */
export function getUserName(person: Person | any): string {
    const fName = person?.first_name ?? ""
    const lName = person?.last_name ?? ""
    return `${fName} ${lName}`
}

/**
 * Gets and returns the email of @params {person}
 * @param person 
 * @returns string
 */
export function getUserEmail(person: Person | any): string {
    return person?.email[0]?.value ?? ''
}

/**
 * Gets and returns the phone of @params {person}
 * @param person 
 * @returns number
 */
export function getUserPhone(person: Person | any): number {
    const phone = person?.phone[0]?.value!!
    return phone
}

/**
 * Gets and returns the picture uri of @params {person}
 * @param person 
 * @returns string
 */
export function getUserPicture(person: Person | any): string {
    return person?.picture_id?.pictures[512]!! ?? avatar
}

/**
 * Gets and returns the start time and date of a deal of @params {add_date}
 * @param add_date 
 * @returns {add_date: string, add_time: string} | undefined
 */
export function getStartTime(add_date: string): { add_date: string, add_time: string } | undefined {
    if (!add_date?.length) return;
    const split = add_date?.split(" ")
    return { add_date: split[0], add_time: split[1] }
}


/**
 * Formats texts that includes "[Sample]" and returns a string without [Sample]
 * @param text 
 * @returns string
 */
export function formatSampleText(text: string): string {
    if (!text?.includes("[Sample]")) return text;
    const split = text?.split("]")
    return split[1]?.trimStart()
}