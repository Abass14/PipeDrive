import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { capitalize } from "../../utils/textUtils";
import CustomText from "../CustomText";
import IconView from "../IconView";
import { styles } from "./styles";

type UserCardProps = {
    imageUri: string,
    userName: string,
    email: string,
    onPress?: () => void
}
const UserCard: React.FC<UserCardProps> = ({
    imageUri,
    userName,
    email,
    onPress
}): JSX.Element => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.innerConterOne}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: imageUri }} style={styles.avatar} resizeMode={"cover"} />
                </View>
                <View style={styles.textContainer}>
                    <CustomText textProps={{numberOfLines: 1}} bold={true} style={[styles.names, { fontSize: 16 }]}>
                        {capitalize(userName)}
                    </CustomText>
                    <CustomText style={styles.names} textProps={{numberOfLines: 1}}>
                        {email}
                    </CustomText>
                </View>
            </View>
            <View style={styles.innerContainerTwo}>
                <IconView
                    type="material"
                    name="chevron-right"
                    size={30}
                />
            </View>
        </TouchableOpacity>
    )
}

export default UserCard;