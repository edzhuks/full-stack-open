import { StyleSheet } from 'react-native';
import { View, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';

const styles = StyleSheet.create({
    form: {
        backgroundColor: theme.colors.foreground,
    },
    signInButton: {
        margin: theme.paddings.cardContent,
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

const initialValues = {
    username: '',
    password: '',
};

const LoginForm = ({ onSubmit }) => {
    return (
        <View style={styles.form}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry
            />

            <Pressable onPress={onSubmit} style={styles.signInButton}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;
