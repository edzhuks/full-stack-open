import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import Row from './Row';
import { Link } from 'react-router-native';

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

const AppBarTab = ({ text, path }) => {
    return (
        <Link to={path}>
            <View style={styles.tab}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </Link>
    );
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            <Row>
                <AppBarTab text="Repositories" path="/" />
                <AppBarTab text="Sign In" path="/signin" />
            </Row>
        </View>
    );
};

export default AppBar;
