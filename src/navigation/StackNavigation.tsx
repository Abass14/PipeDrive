import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { PERSON_DETAILS_SCREEN, PERSON_LIST_SCREEN } from "../utils/constants";
import { PersonDetailsScreen } from "../screens/PersonDetailScreen";
import { PersonListScreen } from "../screens/PersonListScreen";


type StackParams = {
    PERSON_LIST_SCREEN: undefined
    PERSON_DETAILS_SCREEN: {id: number}
}
const Stack = createStackNavigator<StackParams>()
const StackNavigation = (): JSX.Element => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,  //To remove all default toolbars on all Screens
                header: () => null
            }}
        >
            <Stack.Screen 
                name={PERSON_LIST_SCREEN}
                component={PersonListScreen}
                options={{
                    headerShown: false,
                    header: () => null
                }}
            />
            <Stack.Screen 
                name={PERSON_DETAILS_SCREEN}
                component={PersonDetailsScreen}
                options={{
                    headerShown: false,
                    header: () => null
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation;