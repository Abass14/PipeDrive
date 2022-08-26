import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        height: 200
    },
    dealNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dealTitle: {
        fontSize: 25
    },
    dealPrice: {
        fontSize: 20
    },
    secondLevelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    assignedContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingRight: 10
    },
    thirdLevelContainer: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})