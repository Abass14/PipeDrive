import React from "react";
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import CustomText from "../CustomText";

type HyperLinkProps = {
    text: string | any,
    onPressed?: () => void,
    containerStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>
}
const HyperLink: React.FC<HyperLinkProps> = ({
    text,
    onPressed,
    containerStyle,
    textStyle
}) => {
    return (
        <TouchableOpacity style={containerStyle} onPress={onPressed}>
            <CustomText bold={true} style={[{textDecorationLine: "underline"}, textStyle]}>
                {text}
            </CustomText>
        </TouchableOpacity>
    )
}


export default HyperLink;