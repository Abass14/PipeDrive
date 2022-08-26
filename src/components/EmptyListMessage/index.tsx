import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import CustomText from "../CustomText";

type EmptyListMessageProps = {
    message: string,
    style?: StyleProp<TextStyle>,
    containerStyle?: StyleProp<ViewStyle>
}
const EmptyListMessage: React.FC<EmptyListMessageProps> = ({
    message,
    style,
    containerStyle
}) => {

    return (
        <View style={[{height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 10}, containerStyle]}>
            <CustomText style={[{fontSize: 16}, style]} bold={true}>{message}</CustomText>
        </View>
    )
}

export default EmptyListMessage