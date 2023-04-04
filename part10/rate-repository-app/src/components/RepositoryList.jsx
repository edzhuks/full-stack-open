import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({ selectedSort, setSort }) => {
    return (
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
    );
};

export const RepositoryListContainer = ({
    selectedSort,
    setSort,
    repositories,
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
                <SortPicker selectedSort={selectedSort} setSort={setSort} />
            }
        />
    );
};

const RepositoryList = () => {
    const [selectedSort, setSort] = useState('latest');
    const { repositories } = useRepositories(selectedSort);
    return (
        <RepositoryListContainer
            repositories={repositories}
            selectedSort={selectedSort}
            setSort={setSort}
        />
    );
};

export default RepositoryList;
