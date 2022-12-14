import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        paddingHorizontal: 20,
    },
    loader: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    personTxt: {
        fontSize: 30,
        marginTop: 10
    },
    emptyMessageContainer: { 
        position: 'absolute', 
        top: 20, 
        width: '100%', 
        alignSelf: 'center' 
    },
    emptyMessage: {
        backgroundColor: 'transparent' 
    },
    loadMore: {
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 50
    }
})