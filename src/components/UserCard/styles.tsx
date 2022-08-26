import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    innerConterOne: {
        flex: 1,
        flexDirection: 'row'
    },
    textContainer: {
        marginLeft: 10, 
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    innerContainerTwo: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    avatarContainer: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        resizeMode: 'cover',
        borderRadius: 30,
    },
    avatar: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
    },
    names: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        maxWidth: 200
    },
})