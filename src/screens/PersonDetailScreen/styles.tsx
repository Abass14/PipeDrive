import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    innerContainerOne: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30
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
    },
    heaingView: {
        marginBottom: 15,
        marginTop: 10
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    centeredView: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1 
    }
})