import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Linking, FlatList } from "react-native";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux/reducers";
import { fetchPersons, fetchPersonActivities, fetchPersonDeals, fetchPersonActivitiesFromContext, fetchPersonDealsFromContext } from '../../redux/actions'
import { State } from "../../redux/state";
import { Route } from "@react-navigation/native";
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

type PersonDetailScreenProps = {
    appState: State,
    fetchPersons: Function,
    fetchPersonActivities: Function,
    fetchPersonDeals: Function,
    fetchPersonActivitiesFromContext: Function,
    fetchPersonDealsFromContext: Function,
    route: Route<any, any>
}

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

    const fetchActivities = async () => {
        const data = await getCachedActivities()
        const act = data?.get(id)
        fetchFromCacheNetwork(act, activity, async () => {
            await fetchPersonActivitiesFromContext()
            await fetchPersonActivities(id)
        },  async () => {
            setActivityLoading(true)
            await fetchPersonActivities(id)
            await fetchPersonActivitiesFromContext()
            setActivityLoading(false)
        })
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
                <CustomText style={styles.heading} bold={true}>Activities {`(${activity.length})`}</CustomText>
                <View>
                    {activityLoading ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <EmptyListMessage message={activitiesListError || `${formatSampleText(getUserName(person))} has no Activities`} />
                                </View>
                            )}

                        </View>
                    )}

                </View>
                <CustomText style={styles.heading} bold={true}>Deals {`(${deals.length})`}</CustomText>
                <View>
                    {dealsLoading ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
