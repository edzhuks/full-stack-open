import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
    },
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
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                style={styles.input}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
