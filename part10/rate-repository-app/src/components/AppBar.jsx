import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackground,
    },
    text: {
        color: theme.colors.inverseText,
        fontWeight: 'bold',
        fontSize: theme.fontSizes.appBar,
    },
    tab: {
        padding: theme.paddings.appBarTab,
    },
});

const AppBarTab = ({ text, path, onClick }) => {
    if (onClick) {
        return (
            <Pressable style={styles.tab} onPress={onClick}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        );
    }
    return (
        <Link to={path}>
            <View style={styles.tab}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </Link>
    );
};

const AppBar = () => {
    const redirect = useNavigate();
    const { loading, data } = useQuery(ME);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const logOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        redirect('/signin');
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab text="Repositories" path="/" />

                {!loading &&
                    (!data.me ? (
                        <AppBarTab text="Sign In" path="/signin" />
                    ) : (
                        <>
                            <AppBarTab
                                text="Create a review"
                                path="/createReview"
                            />
                            <AppBarTab
                                text="Sign Out"
                                path="/signin"
                                onClick={logOut}
                            />
                        </>
                    ))}
            </ScrollView>
        </View>
    );
};

export default AppBar;
