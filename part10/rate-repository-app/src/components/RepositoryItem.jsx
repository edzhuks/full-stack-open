import { StyleSheet, Image } from 'react-native';

import { View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import Row from './Row';
import Column from './Column';

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: theme.cornerRadius,
        marginRight: theme.paddings.cardContent,
    },
    card: {
        padding: theme.paddings.cardContent,
        backgroundColor: theme.colors.foreground,
    },
    tag: {
        container: {
            backgroundColor: theme.colors.primary,
            padding: 4,
            marginBottom: theme.paddings.cardContentCompact,
            borderRadius: theme.cornerRadius,
        },
        text: {
            color: theme.colors.inverseText,
        },
    },
});

const ScoreItem = ({ score, name }) => {
    const scoreText =
        score >= 1000 ? `${Math.round(score / 100) / 10}k` : score;
    return (
        <Column center>
            <Text heading>{scoreText}</Text>
            <Text subheading>{name}</Text>
        </Column>
    );
};

const RepositoryItem = ({ repository }) => {
    return (
        <View style={styles.card}>
            <Row left>
                <Image
                    style={styles.avatar}
                    source={{ uri: repository.ownerAvatarUrl }}
                />
                <Column left>
                    <Text heading>{repository.fullName}</Text>
                    <Text subheading>{repository.description}</Text>
                    <View style={styles.tag.container}>
                        <Text style={styles.tag.text} fontSize="subheading">
                            {repository.language}
                        </Text>
                    </View>
                </Column>
            </Row>
            <Row even>
                <ScoreItem score={repository.stargazersCount} name="Stars" />
                <ScoreItem score={repository.forksCount} name="Forks" />
                <ScoreItem score={repository.reviewCount} name="Reviews" />
                <ScoreItem score={repository.ratingAverage} name="Rating" />
            </Row>
        </View>
    );
};

export default RepositoryItem;
