import Text from './Text';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { ItemSeparator } from './RepositoryList';
import theme from '../theme';
import { StyleSheet } from 'react-native';
import Row from './Row';
import Column from './Column';
import { format, parseJSON } from 'date-fns';
const styles = StyleSheet.create({
    card: {
        padding: theme.paddings.cardContent,
        backgroundColor: theme.colors.foreground,
    },
    score: {
        borderWidth: 2,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.paddings.cardContent,
    },
    scoreText: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.heading,
    },
    ratingText: {
        fontSize: theme.fontSizes.subheading,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});

const RepositoryInfo = ({ repository }) => {
    return (
        <View>
            <RepositoryItem repository={repository} expanded />
            <ItemSeparator />
        </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.card}>
            <Row>
                <Column>
                    <View style={styles.score}>
                        <Text style={styles.scoreText}>{review.rating}</Text>
                    </View>
                </Column>
                <Column style={{ flexShrink: 1 }}>
                    <Text heading>{review.user.username}</Text>
                    <Text subheading>
                        {format(parseJSON(review.createdAt), 'dd.MM.yyyy')}
                    </Text>
                    <Text style={styles.ratingText}>{review.text}</Text>
                </Column>
            </Row>
        </View>
    );
};

const RepositoryPage = () => {
    const { id } = useParams();
    const { repository } = useRepository(id);
    if (!repository) {
        return <Text>loading</Text>;
    }
    const reviews = repository.reviews.edges.map((edge) => edge.node);
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <RepositoryInfo repository={repository} />
            )}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default RepositoryPage;
