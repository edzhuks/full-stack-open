import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';
import theme from '../theme';
const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
    selectedSort,
    setSort,
    searchQuery,
    setSearchQuery,
}) => {
    return (
        <>
            <TextInput
                placeholder="Search"
                onChangeText={(value) => setSearchQuery(value)}
                value={searchQuery}
                style={{ backgroundColor: theme.colors.foreground }}
            />
            <Picker
                selectedValue={selectedSort}
                onValueChange={(itemValue) => setSort(itemValue)}>
                <Picker.Item label="Latest repositories" value="latest" />
                <Picker.Item
                    label="Highest rated repositories"
                    value="highestRated"
                />
                <Picker.Item
                    label="Lowest rated repositories"
                    value="lowestRated"
                />
            </Picker>
        </>
    );
};

export const RepositoryListContainer = ({
    selectedSort,
    setSort,
    repositories,
    searchQuery,
    setSearchQuery,
}) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem repository={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <RepositoryListHeader
                    selectedSort={selectedSort}
                    setSort={setSort}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            }
        />
    );
};

const RepositoryList = () => {
    const [selectedSort, setSort] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const { repositories } = useRepositories(
        selectedSort,
        debouncedSearchQuery
    );
    return (
        <RepositoryListContainer
            repositories={repositories}
            selectedSort={selectedSort}
            setSort={setSort}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default RepositoryList;
