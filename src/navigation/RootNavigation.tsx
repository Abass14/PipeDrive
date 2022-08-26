import { NavigationContainer, NavigationContainerProps } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import StackNavigation from "./StackNavigation";

type RootNavigationParams = {
    navigationProps?: NavigationContainerProps
}
const RootNavigation: React.FC<RootNavigationParams> = ({
    navigationProps
}) : JSX.Element => {
    return (
        <NavigationContainer {...navigationProps}>
            <StackNavigation />
        </NavigationContainer>
    )
}

export default RootNavigation