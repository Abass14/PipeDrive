import { Person } from "../model/model";

export function getUserDetails (id: number, userList: Array<Person>) : Person | undefined {
    const user = userList?.find((user) => id === user?.id)
    return user
}

export function getUserName (person: Person | undefined) : string {
    return `${person?.first_name} ${person?.last_name}`
}

export function getUserEmail (person: Person | undefined) : string {
    return person?.email[0]?.value ?? ''
}

export function getUserPhone (person: Person | undefined) : number {
    const phone = person?.phone[0]?.value!!
    return phone
}

export function getUserPicture (person: Person | undefined) : string {
    return person?.picture_id?.pictures[512]!!
}

export function getStartTime (add_date: string) : {add_date: string, add_time: string} | undefined {
    if (!add_date?.length) return;
    const split = add_date?.split(" ")
    return {add_date: split[0], add_time: split[0]}
}

export function formatSampleText (text: string) : string {
    if (!text?.includes("[Sample]")) return text;
    const split = text?.split("]")
    return split[1]?.trimStart()
}