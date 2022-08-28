import  AsyncStorage  from '@react-native-async-storage/async-storage'
import { cacheData, getCachedActivities, getCachedDeals, getCachedPersons, setObject } from '../storage';
import { ACTIVITES, DEALS, PERSONS } from '../utils/constants';
import { personList } from './userUtils.test';

beforeEach(() => {
    AsyncStorage.clear();
});

it('can read asyncstorage', async () => {
    await AsyncStorage.setItem('username', 'testUser')
    let usernameValue = await AsyncStorage.getItem('username')
    expect(usernameValue).toBe('testUser')
});

describe("test all storage functions", () => {
    it("should store person list and return person list", async () => {
       await setObject(PERSONS, cacheData(personList))
       let personsList = await getCachedPersons();
       expect(JSON.stringify(personsList)).toBe(JSON.stringify(personList))
    })

    it("should store  a map of deals and return a map of deals", async () => {
        const dealsMap = new Map();
        dealsMap.set(1, ["Abass Deal", "Adisa Deal"])
        dealsMap.set(2, ["Scarlett Deal", "Johansson Deal"])
        await setObject(DEALS, JSON.stringify(Array.from(dealsMap.entries())))
        let deals = await getCachedDeals();
        expect(JSON.stringify(deals.get(1))).toBe(JSON.stringify(dealsMap.get(1)))
     })

     it("should store  a map of activities and return a map of activities", async () => {
        const activitiesMap = new Map();
        activitiesMap.set(1, ["Call", "Meeting"])
        activitiesMap.set(2, ["Planning", "Conference call"])
        await setObject(ACTIVITES, JSON.stringify(Array.from(activitiesMap.entries())))
        let activities = await getCachedActivities();
        expect(JSON.stringify(activities.get(2))).toBe(JSON.stringify(activitiesMap.get(2)))
     })
})