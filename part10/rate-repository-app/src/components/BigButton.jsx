import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    signInButton: {
        padding: theme.paddings.cardContent,
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        textAlign: 'center',
    },
    buttonText: {
        color: theme.colors.inverseText,
        fontWeight: 'bold',
        fontSize: theme.fontSizes.appBar,
    },
});

const BigButton = ({ text, onClick, style }) => {
    return (
        <Pressable onPress={onClick} style={[styles.signInButton, style]}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

export default BigButton;
