import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

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

const AppBarTab = ({ text }) => {
    return (
        <Pressable style={styles.tab}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab text="Repositories" />
        </View>
    );
};

export default AppBar;
