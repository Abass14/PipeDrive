import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import UserCard from "../../components/UserCard";
import { Person } from "../../model/model";
import { ApplicationState } from "../../redux/reducers";
import { avatar, LIMIT, MAX, PERSON_DETAILS_SCREEN } from "../../utils/constants";
import { styles } from "./styles";
import { fetchPersons, fetchPersonsFromContext } from "../../redux/actions"
import { connect } from "react-redux";
import { State } from "../../redux/state";
import Loader from "../../components/Loader";
import CustomText from "../../components/CustomText";
import { formatSampleText, getUserEmail, getUserName, getUserPicture } from "../../utils/userUtils";
import EmptyListMessage from "../../components/EmptyListMessage";
import { fetchFromCacheNetwork, getCachedPersons } from "../../storage";
import { PersonListScreenProps } from "../../utils/types";

const _PersonListScreen: React.FC<PersonListScreenProps> = ({
    navigation,
    fetchPersons,
    fetchPersonsFromContext,
    appState
}): JSX.Element => {
    const { navigate } = navigation;
    const { personsList, personListError } = appState;
    const [isLoading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [start, setStart] = useState(0);
    const [localPersonsList, setLocalPersonsList] = useState<Array<Person>>([])
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    useEffect(() => {
        fetchPerson(start, LIMIT, false)
    }, [start])

    const fetchPerson = async (start: number, limit: number, refresh: boolean) => {
        if (start > 20) return;
        const cachedPersons = await getCachedPersons();
        if (cachedPersons) setLocalPersonsList(cachedPersons)
        fetchFromCacheNetwork(cachedPersons, personsList, async () => {
            if (!refreshing) await fetchPersons(start, limit, false)
            if (!refreshing) await fetchPersonsFromContext()
        }, async () => {
            setIsLoading(true)
            if (!refreshing) await fetchPersons(start, limit, refresh);
            await fetchPersonsFromContext();
            setIsLoading(false)
        })
        setIsLoadingMore(false)
    }

    const onRefresh = async () => {
        setStart(0)
        setRefreshing(true)
        await fetchPersons(0, LIMIT, true)
        await fetchPersonsFromContext();
        setRefreshing(false)
    }

    const loadMorePersons = () => {
        setIsLoadingMore(true)
        setStart(start + 10)
    }

    const getPersonsList = () => {
        if (personsList?.length) return personsList;
        return localPersonsList;
    }

    const renderItem = (person: Person) => {
        return (
            <UserCard
                imageUri={getUserPicture(person)}
                userName={formatSampleText(getUserName(person))}
                email={getUserEmail(person)}
                onPress={() => { navigate(PERSON_DETAILS_SCREEN, { id: person.id }) }}
            />
        )
    }

    const renderFooter = () => {
        if (!isLoadingMore) return null;
        if (personsList.length >= MAX) return null;
        return (
            <View style={styles.loadMore}>
                <Loader type="square-dots" />
            </View>
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
        <View testID="Persons" style={styles.conatiner}>
            {personListError && (
                <View style={styles.emptyMessageContainer}>
                    <EmptyListMessage containerStyle={styles.emptyMessage} message={personListError} style={{ color: 'red' }} />
                </View>
            )}
            <CustomText style={styles.personTxt} bold={true}>Persons</CustomText>
            <View style={{ marginTop: 20, flex: 1 }}>
                <FlatList
                    data={getPersonsList()}
                    renderItem={(item) => renderItem(item.item)}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    showsVerticalScrollIndicator={false}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    onEndReached={loadMorePersons}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            </View>

        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    appState: state
})

export const PersonListScreen = connect(mapToStateProps, { fetchPersons, fetchPersonsFromContext })(_PersonListScreen)
