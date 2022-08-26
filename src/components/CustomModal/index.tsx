import React from "react";
import { Modal, View } from "react-native";
import Button from "../Button";
import CustomText from "../CustomText";
import { styles } from "./styles";


const CustomModal = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            // onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            // setModalVisible(!modalVisible);
            // }}
        >
            <View style={styles.containerStyle}>
                <View style={styles.modalContainer}>
                <View >
                    <CustomText style={styles.title}>Title</CustomText>
                </View>
                <View >
                    <CustomText style={styles.body}>This is the body</CustomText>
                </View>
                <View style={{marginHorizontal: 20, width: '100%'}}>
                    <Button 
                        btnText="Do Something"
                        onPress={() => {}}
                    />
                </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal