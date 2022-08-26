import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
      },
      modalContainer: {
        flex: 1,
        width: '90%',
        maxHeight: 250,
        padding: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cdd2c9',
        backgroundColor: 'white',
        justifyContent: "space-between",
        alignItems: "center",
      },
    centeredView: {
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        marginLeft: 20,
        marginRight: 20
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    container: {
        width: 300,
        height: 400,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    },
    body: {
        fontSize: 16,
        textAlign: 'center'
    },
})