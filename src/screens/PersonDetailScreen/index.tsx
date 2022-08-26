import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Linking, FlatList } from "react-native";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux/reducers";
import { fetchPersons, fetchPersonActivities, fetchPersonDeals, fetchPersonActivitiesFromContext, fetchPersonDealsFromContext } from '../../redux/actions'
import NetInfo from "@react-native-community/netinfo"
import { styles } from "./styles";
import { formatSampleText, getUserDetails, getUserEmail, getUserName, getUserPhone, getUserPicture } from "../../utils/userUtils";
import { avatar } from "../../utils/constants";
import IconView from "../../components/IconView";
import CustomText from "../../components/CustomText";
import { Activity, Deals } from "../../model/model";
import ActivitiesCard from "../../components/ActivitiesCard";
import Loader from "../../components/Loader";
import EmptyListMessage from "../../components/EmptyListMessage";
import DealsCard from "../../components/DealsCard";
import { fetchFromCacheNetwork, getCachedActivities, getCachedDeals } from "../../storage";
import HyperLink from "../../components/Hyperlink";
import { PersonDetailScreenProps } from "../../utils/types";

const _PersonDetailsScreen: React.FC<PersonDetailScreenProps> = ({
    appState,
    fetchPersons,
    fetchPersonActivities,
    fetchPersonDeals,
    route,
    fetchPersonActivitiesFromContext,
    fetchPersonDealsFromContext
}): JSX.Element => {
    const { personsList, activitiesListError, dealsListError, activityMap, dealsMap } = appState;
    const { params = {} } = route;
    const { id = 0 } = params;
    const person = getUserDetails(id, personsList)
    const activity = activityMap.get(id) ?? []
    const deals = dealsMap.get(id) ?? []
    const [activityLoading, setActivityLoading] = useState(false)
    const [dealsLoading, setDealsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        const subscribe = NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                setErrorMsg("Error Fetching Data")
            }
        })
        subscribe()
    }, [])

    const fetchActivities = async () => {
        const data = await getCachedActivities()
        const act = data?.get(id)
        fetchFromCacheNetwork(act, activity, async () => {
            await fetchPersonActivitiesFromContext()
            await fetchPersonActivities(id)
        }, async () => {
            setActivityLoading(true)
            await fetchPersonActivities(id)
            await fetchPersonActivitiesFromContext()
            setActivityLoading(false)
        })
        setErrorMsg("")
    }

    const fetchDeals = async () => {
        const cached = await getCachedDeals()
        const dls = cached?.get(id)
        fetchFromCacheNetwork(dls, deals, async () => {
            await fetchPersonDealsFromContext()
            await fetchPersonDeals(id)
        }, async () => {
            setDealsLoading(true)
            await fetchPersonDeals(id)
            setDealsLoading(false)
        })
        setErrorMsg("")
    }

    useEffect(() => {
        fetchActivities().then(() => fetchDeals())
    }, [])

    const makePhoneCall = () => {
        const phoneNumber = getUserPhone(person);
        if (!phoneNumber) return;
        Linking.openURL(`tel:${phoneNumber}`)
    }

    const renderActivities = (activity: Activity) => {
        return (
            <View>
                <ActivitiesCard
                    subject={formatSampleText(activity.subject)}
                    activity_type={activity.type}
                    add_time={activity.add_time}
                    due_date={activity.due_date}
                    participants_list={activity.participants}
                    personsList={personsList}
                />
            </View>
        )
    }

    const renderDeals = (deals: Deals) => {
        return (
            <View>
                <DealsCard
                    title={formatSampleText(deals.title)}
                    price={deals.formatted_value}
                    start_date={deals.add_time}
                    close_date={deals.expected_close_date}
                    organization={formatSampleText(deals.org_name)}
                    active={deals.active}
                    won={deals.status}
                    assigned_to={formatSampleText(deals.person_name)}
                />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainerOne}>
                <View>
                    <View style={styles.avatarContainer}>
                        <Image resizeMode="cover" source={{ uri: getUserPicture(person) ?? avatar }} style={styles.avatar} />
                    </View>
                    <View style={styles.phone}>
                        <IconView
                            type="material"
                            name="phone"
                            size={40}
                            color={"white"}
                            onPress={makePhoneCall}
                        />
                    </View>
                </View>
                <CustomText style={styles.userName} bold={true}>{formatSampleText(getUserName(person))}</CustomText>
                <CustomText >{getUserEmail(person)}</CustomText>
            </View>
            <ScrollView style={styles.innerContainerTwo} showsVerticalScrollIndicator={false}>
            <View style={[styles.heaingView, styles.horizontalView]}>
                    <CustomText style={styles.heading} bold={true}>
                        Activities {`(${activity.length}) `}
                    </CustomText>
                    {(activitiesListError || errorMsg) && (
                        <View style={styles.horizontalView}>
                            <CustomText style={{ color: 'red', marginLeft: 10 }}>
                                {activitiesListError || errorMsg}
                            </CustomText>
                            <HyperLink text={" Try Again"} onPressed={fetchActivities} />
                        </View>
                    )}
                </View>
                <View>
                    {activityLoading ? (
                        <View style={styles.centeredView}>
                            <Loader type="square-dots" dots_style={{ backgroundColor: 'blue' }} />
                        </View>
                    ) : (
                        <View>
                            {activity.length ? (
                                <FlatList
                                    data={activity}
                                    renderItem={(item) => renderActivities(item.item)}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                />
                            ) : (
                                <View style={styles.centeredView}>
                                    <EmptyListMessage message={activitiesListError || `${formatSampleText(getUserName(person))} has no Activities`} />
                                </View>
                            )}

                        </View>
                    )}

                </View>
                <View style={[styles.heaingView, styles.horizontalView]}>
                    <CustomText style={styles.heading} bold={true}>
                        Deals {`(${deals.length}) `}
                    </CustomText>
                    {(dealsListError || errorMsg) && (
                        <View style={styles.horizontalView}>
                            <CustomText style={{ color: 'red', marginLeft: 10 }}>
                                {dealsListError || errorMsg}
                            </CustomText>
                            <HyperLink text={" Try Again"} onPressed={fetchDeals} />
                        </View>
                    )}
                </View>
                <View>
                    {dealsLoading ? (
                        <View style={styles.centeredView}>
                            <Loader type="square-dots" dots_style={{ backgroundColor: 'blue' }} />
                        </View>
                    ) : (
                        <View>
                            {deals.length ? (
                                <FlatList
                                    data={deals}
                                    renderItem={(item) => renderDeals(item.item)}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            ) : (
                                <View style={styles.centeredView}>
                                    <EmptyListMessage message={dealsListError || `${formatSampleText(getUserName(person))} has no Deals`} />
                                </View>
                            )}

                        </View>
                    )}

                </View>
            </ScrollView>
        </ScrollView>
    )
}


const mapToStateProps = (state: ApplicationState) => ({
    appState: state
})

export const PersonDetailsScreen = connect(mapToStateProps, { fetchPersons, fetchPersonActivities, fetchPersonDealsFromContext, fetchPersonDeals, fetchPersonActivitiesFromContext })(_PersonDetailsScreen)
