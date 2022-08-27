import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";
import IconView from "../IconView";
import { styles } from "./styles";


type DealsCardProps = {
    title: string,
    price: string,
    start_date: string,
    close_date: string,
    organization: string,
    active: boolean,
    assigned_to: string,
    won: string
}

/**
 * 
 * @param param0: DealsCardProps
 * @returns 
 */
const DealsCard: React.FC<DealsCardProps> = ({
    title,
    price,
    start_date,
    close_date,
    organization,
    active = false,
    assigned_to,
    won 
}) => {

    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: !active ? '#cfd8dc' : 'white'}]} disabled={!active}>
            <View style={styles.dealNameContainer}>
                <CustomText style={styles.dealTitle} bold={true}>{title}</CustomText>
                {won === "won" && (
                    <IconView
                        type="material"
                        name="emoji-events"
                        size={30}
                        color={"#fb8c00"}
                    />
                )}
            </View>
            <View style={styles.secondLevelContainer}>
                <View>
                    <CustomText style={styles.dealPrice} bold={true}>{price}</CustomText>
                    <CustomText><CustomText bold={true}>Initiated: </CustomText>{start_date}</CustomText>
                    <CustomText><CustomText bold={true}>Organization: </CustomText>{organization}</CustomText>
                </View>
                <View style={styles.assignedContainer}>
                    <CustomText textProps={{numberOfLines: 1}} style={{maxWidth: 60}}>
                        {assigned_to}
                    </CustomText>
                </View>
            </View>
            <View style={[styles.thirdLevelContainer, {backgroundColor: active ? 'red' : '#546e7a'}]}>
                <CustomText style={{ color: 'white' }}>Estimated Close Date: {close_date}</CustomText>
            </View>
        </TouchableOpacity>
    )
}

export default DealsCard;