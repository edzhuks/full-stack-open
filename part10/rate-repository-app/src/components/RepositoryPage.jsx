import Text from './Text';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { ItemSeparator } from './RepositoryList';
import { ReviewItem } from './ReviewList';

const RepositoryInfo = ({ repository }) => {
    return (
        <View>
            <RepositoryItem repository={repository} expanded />
            <ItemSeparator />
        </View>
    );
};

const RepositoryPage = () => {
    const { id } = useParams();
    const { repository, loading, fetchMore } = useRepository(id, 4);
    if (loading) {
        return <Text>loading</Text>;
    }
    const reviews = repository.reviews.edges.map((edge) => edge.node);
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => (
                <ReviewItem byUsername={true} review={item} />
            )}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <RepositoryInfo repository={repository} />
            )}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.5}
        />
    );
};

export default RepositoryPage;
