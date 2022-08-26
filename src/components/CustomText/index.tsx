import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type CustomTextProps = {
    children: string | React.ReactNode,
    style?: StyleProp<TextStyle>,
    textProps?: TextProps,
    bold?: boolean
}
const CustomText: React.FC<CustomTextProps> = ({
    children,
    style,
    textProps,
    bold
}) => {
    return (
        <Text style={[{
            fontSize: 12,
            fontWeight: bold ? '700' : 'normal'
        }, style]} {...textProps}>
            {children}
        </Text>
    )
}

export default CustomText