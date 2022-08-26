import { applyMiddleware, legacy_createStore as createStore, } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistReducer, persistStore, createTransform } from "redux-persist"

const config = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer({...config, blacklist: ['activityMap', 'dealsMap', 'personsList']}, reducer)
export const store = createStore(reducer, applyMiddleware(thunk));
export const persistor = persistStore(store)