import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import CustomText from "../CustomText";
import { styles } from "./styles";

type LoaderProps = {
    color?: string,
    size?: "small" | "large",
    type?: "round" | "square-dots",
    dots_style?: StyleProp<ViewStyle>,
    view_style?: StyleProp<ViewStyle>,
    text?: string,
    textStyle?: StyleProp<TextStyle>
}
const Loader: React.FC<LoaderProps> = ({ color = "blue", size = "large", type = "round", dots_style, view_style, text, textStyle }): JSX.Element => {
    const fadeInOne = useRef(new Animated.Value(0)).current
    const fadeInTwo = useRef(new Animated.Value(0)).current
    const fadeInThree = useRef(new Animated.Value(0)).current
    const interpolate = {
        inputRange: [0, 100],
        outputRange: [0, 1]
    }

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeInOne, {
                    toValue: 100,
                    useNativeDriver: true
                }),
                Animated.timing(fadeInTwo, {
                    toValue: 100,
                    useNativeDriver: true
                }),
                Animated.timing(fadeInThree, {
                    toValue: 100,
                    useNativeDriver: true
                }),
            ]),
            { iterations: Infinity }
        ).start()
        return () => {
            fadeInOne.removeAllListeners()
            fadeInTwo.removeAllListeners()
            fadeInThree.removeAllListeners()
        }
    }, [])
    if (type === "square-dots") {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={[styles.square_dots, view_style]}>
                    <Animated.View
                        style={[styles.dots, dots_style, {
                            opacity: fadeInOne.interpolate(interpolate),
                            marginRight: 5
                        }]}
                    />
                    <Animated.View
                        style={[styles.dots, dots_style, {
                            opacity: fadeInTwo.interpolate(interpolate)
                        }]}
                    />
                    <Animated.View
                        style={[styles.dots, dots_style, {
                            opacity: fadeInThree.interpolate(interpolate),
                            marginLeft: 5
                        }]}
                    />

                </View>
                {text && <CustomText>{`${text}`}</CustomText>}
            </View>

        )
    }
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 100}}>
                <ActivityIndicator size={size} color={color} />
            </View>
            {text && <CustomText style={textStyle}>{`${text}`}</CustomText>}
        </View>
    )
}

export default Loader;