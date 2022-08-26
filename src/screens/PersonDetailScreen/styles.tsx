import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    innerContainerOne: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainerTwo: {
        flex: 1
    },
    phone: {
        height: 70,
        width: 70,
        borderRadius: 35,
        position: "absolute",
        bottom: -15,
        right: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        height: 200,
        width: 200,
        borderRadius: 100,
        overflow: 'hidden'
    },
    avatar: {
        height: 200,
        width: 200,
        resizeMode: "cover"
    },
    userName: {
        marginTop: 15,
        fontSize: 20
    },
    heading: {
        fontSize: 20,
        marginBottom: 15,
        marginTop: 10
    }
})