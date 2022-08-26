import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Participants, Person } from "../../model/model";
import { avatar } from "../../utils/constants";
import { capitalize } from "../../utils/textUtils";
import { formatSampleText, getStartTime, getUserDetails, getUserName, getUserPicture } from "../../utils/userUtils";
import CustomText from "../CustomText";
import { styles } from "./styles";

type ActivitiesCardProps = {
    subject: string,
    activity_type: string,
    participants_list?: Array<Participants>,
    add_time: string,
    due_date: string,
    personsList: Array<Person>
}
const ActivitiesCard: React.FC<ActivitiesCardProps> = ({
    subject,
    activity_type,
    participants_list,
    add_time,
    due_date,
    personsList
}) => {

    const renderItem = (participant: Participants) => {
        const person = getUserDetails(participant.person_id, personsList)
        return (
            <View style={styles.userImageContainer} key={participant.person_id.toString()} >

                <View style={styles.userImage}>
                    <Image source={{ uri: getUserPicture(person) ?? avatar}} resizeMode={"cover"} style={{ height: 80, width: 80, resizeMode: 'cover' }} />
                </View>
                <CustomText textProps={{ numberOfLines: 1 }}>{formatSampleText(getUserName(person))}</CustomText>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainerOne}>
                <View style={styles.textContainer}>
                    <CustomText style={{ fontSize: 20, fontWeight: '700' }}>{capitalize(subject)}</CustomText>
                    <CustomText><CustomText bold={true}>Type:</CustomText> {capitalize(activity_type)}</CustomText>
                </View>
                <View style={styles.textContainer}>
                    <CustomText textProps={{numberOfLines: 1}} style={{maxWidth: 130}}><CustomText bold={true}>Start Date:</CustomText> {getStartTime(add_time)?.add_date}</CustomText>
                    <CustomText textProps={{numberOfLines: 1}} style={{maxWidth: 130}}><CustomText bold={true}>Due Date:</CustomText> {due_date}</CustomText>
                </View>
            </View>
            <View style={styles.innerContainerTwo}>
                <CustomText bold={true} style={{ fontSize: 16, marginBottom: 10 }}>Participants</CustomText>
                <FlatList 
                    data={participants_list}
                    renderItem={(item) => renderItem(item.item)}
                    keyExtractor={(item) => item.person_id.toString()}
                    horizontal
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ActivitiesCard