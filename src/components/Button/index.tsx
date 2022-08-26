import React from "react";
import { StyleProp, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import { Icon } from "react-native-elements";
import CustomText from "../CustomText";
import IconView from "../IconView";
import Loader from "../Loader";
import { styles } from "./styles";

export interface ButtonProps {
    otherProps?: TouchableOpacityProps,
    btnText?: string,
    otherStyle?: StyleProp<ViewStyle>,
    onPress: () => void,
    loading?: boolean,
    disabled?: boolean,
    iconName?: string,
    iconColor?: string,
    iconSize?: number
}
const Button: React.FC<ButtonProps> = ({ 
    otherProps, 
    btnText = "", 
    otherStyle, 
    onPress, 
    loading, 
    disabled,
    iconName,
    iconColor = 'gray',
    iconSize = 30
}): JSX.Element => {

    return (
        <TouchableOpacity style={[styles.regular, {opacity: disabled ? 0.5 : 1}, otherStyle]} {...otherProps} onPress={onPress} disabled={disabled}>
            {loading ? (
                <View style={{width: 100}}>
                    <Loader type="square-dots" />
                </View>
            ) : (
                <View style={styles.btnRow}>
                    <CustomText style={styles.btnTxt}>{btnText}</CustomText>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default Button;