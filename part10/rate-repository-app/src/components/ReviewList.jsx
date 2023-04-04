import Text from './Text';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { ItemSeparator } from './RepositoryList';
import theme from '../theme';
import { StyleSheet } from 'react-native';
import Row from './Row';
import Column from './Column';
import { format, parseJSON } from 'date-fns';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
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

export const ReviewItem = ({ review, byUsername }) => {
    return (
        <View style={styles.card}>
            <Row>
                <Column>
                    <View style={styles.score}>
                        <Text style={styles.scoreText}>{review.rating}</Text>
                    </View>
                </Column>
                <Column style={{ flexShrink: 1 }}>
                    <Text heading>
                        {byUsername
                            ? review.user.username
                            : review.repository.fullName}
                    </Text>
                    <Text subheading>
                        {format(parseJSON(review.createdAt), 'dd.MM.yyyy')}
                    </Text>
                    <Text style={styles.ratingText}>{review.text}</Text>
                </Column>
            </Row>
        </View>
    );
};

const ReviewList = () => {
    const { loading, data } = useQuery(ME, {
        variables: { includeReviews: true },
    });
    if (loading) {
        return <Text>loading</Text>;
    }
    console.log(data);
    const reviews = data.me.reviews.edges.map((edge) => edge.node);
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => (
                <ReviewItem review={item} byUsername={false} />
            )}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default ReviewList;
