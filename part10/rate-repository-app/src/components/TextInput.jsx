import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    input: {
        margin: theme.paddings.cardContent,
        marginBottom: 0,
        padding: theme.paddings.cardContent,
        borderColor: 'lightgray',
        borderWidth: 2,
        borderRadius: 4,
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.subheading,
    },
    error: {
        borderColor: theme.colors.error,
    },
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [styles.input, error && styles.error, style];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
