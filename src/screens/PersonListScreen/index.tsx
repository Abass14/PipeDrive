import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import UserCard from "../../components/UserCard";
import { Person } from "../../model/model";
import { ApplicationState } from "../../redux/reducers";
import { avatar, LIMIT, PERSON_DETAILS_SCREEN } from "../../utils/constants";
import { styles } from "./styles";
import { fetchPersons } from "../../redux/actions"
import { connect } from "react-redux";
import { State } from "../../redux/state";
import Loader from "../../components/Loader";
import CustomText from "../../components/CustomText";
import { formatSampleText, getUserEmail, getUserName, getUserPicture } from "../../utils/userUtils";
import CustomModal from "../../components/CustomModal";
import EmptyListMessage from "../../components/EmptyListMessage";
import NetInfo from "@react-native-community/netinfo";

type PersonListScreenProps = {
    navigation: NavigationProp<any, any>,
    fetchPersons: Function,
    appState: State
}

const _PersonListScreen: React.FC<PersonListScreenProps> = ({
    navigation,
    fetchPersons,
    appState
}): JSX.Element => {
    const { navigate, reset } = navigation;
    const { personsList, personListError } = appState;
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(personListError);
    const [refreshing, setRefreshing] = useState(false)
    const [start, setStart] = useState(0);
    const [localPersonsList, setLocalPersonsList] = useState<Array<Person>>([])

    const fetchPerson = async (start: number, limit: number, refresh: boolean) => {
        if (!personsList.length) setIsLoading(true);
        if (!refreshing) await fetchPersons(start, limit, refresh);
        setIsLoading(false)
    }

    const onRefresh = async () => {
        setStart(0)
        setRefreshing(true)
        await fetchPersons(0, LIMIT, true)
        setRefreshing(false)
    }

    const hideErrorMessage = () => {
        if (errorMsg) setErrorMsg("");
    }

    const loadMorePersons = () => {
        console.log(start, "<===start")
        setStart(start + 10)
    }

    //get items from cache
    //fetch from api
    //clear cache
    //add items from api to cache
    //get items from cache to UI

    // useEffect(() => {
    //     const subscribe = NetInfo.addEventListener((state) => {
    //         if (!state.isConnected) {
    //             setErrorMsg("You are not connected to any network")
    //         } else {
    //             if (!personsList.length) fetchPerson(0, true)
    //         }
    //     })
    //     subscribe()
    // }, [])

    useEffect(() => {
        fetchPerson(start, LIMIT, false)
    }, [start])

    useEffect(() => {
        const delay = setTimeout(() => {
            hideErrorMessage()
        }, 4000)
        return () => clearTimeout(delay);
    }, [errorMsg])

    const renderItem = (person: Person) => {
        return (
            <UserCard
                imageUri={getUserPicture(person) ?? avatar}
                userName={formatSampleText(getUserName(person))}
                email={getUserEmail(person)}
                onPress={() => { navigate(PERSON_DETAILS_SCREEN, { id: person.id }) }}
            />
        )
    }

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <Loader
                    type="square-dots"
                    dots_style={{
                        backgroundColor: 'blue',
                    }}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* {personListError && } */}
            <View style={styles.conatiner}>
                {errorMsg && <View style={{position: 'absolute', top: 20, width: '100%', alignSelf: 'center'}}><EmptyListMessage containerStyle={{backgroundColor: 'transparent'}} message={errorMsg} style={{color: 'red'}} /></View>}
                <CustomText style={styles.personTxt} bold={true}>Persons</CustomText>
                <View style={{ marginTop: 20, flex: 1 }}>
                    <FlatList
                        data={personsList}
                        renderItem={(item) => renderItem(item.item)}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        showsVerticalScrollIndicator={false}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        onEndReached={loadMorePersons}
                        onEndReachedThreshold={0.1}
                    />
                </View>

            </View>
        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    appState: state
})

export const PersonListScreen = connect(mapToStateProps, { fetchPersons })(_PersonListScreen)
