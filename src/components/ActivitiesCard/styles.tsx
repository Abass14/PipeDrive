import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        height: 200,
        marginRight: 10
    },
    innerContainerOne: {
        flex: 1
    },
    innerContainerTwo: {
        flex: 3,
        paddingTop: 10
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userImageContainer: {
        justifyContent: 'center', 
        width: 70, 
        marginRight: 10 
    },
    userImage: {
        height: 70, 
        width: 70, 
        borderRadius: 10, 
        overflow: 'hidden'
    }
})