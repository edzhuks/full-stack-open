import { StyleSheet } from 'react-native';
import { View, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

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

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

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
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;
