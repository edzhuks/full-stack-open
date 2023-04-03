import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import BigButton from './BigButton';

const styles = StyleSheet.create({
    form: {
        backgroundColor: theme.colors.foreground,
    },
    signinButton: {
        margin: theme.paddings.cardContent,
    },
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.form}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry
            />

            <BigButton
                style={styles.signinButton}
                onClick={onSubmit}
                text="Sign In"
            />
        </View>
    );
};

export const SignInContainer = ({ onSubmit }) => {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignIn = () => {
    const redirect = useNavigate();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            if (data && data.authenticate && data.authenticate.accessToken) {
                redirect('/');
            }
        } catch (e) {
            console.log(e);
        }
    };
    return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
