import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import BigButton from './BigButton';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
    form: {
        backgroundColor: theme.colors.foreground,
    },
    signinButton: {
        margin: theme.paddings.cardContent,
    },
});

const SignUpFormBase = ({ onSubmit }) => {
    return (
        <View style={styles.form}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry
            />
            <FormikTextInput
                name="passwordConfirm"
                placeholder="Password confirmation"
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

const SignUpForm = () => {
    const redirect = useNavigate();
    const [createUser] = useCreateUser();
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
        console.log(values);
        const { username, password, passwordConfirm } = values;
        if (password === passwordConfirm) {
            try {
                const { data } = await createUser({
                    username,
                    password,
                });
                if (data) {
                    const { data } = await signIn({ username, password });
                    if (
                        data &&
                        data.authenticate &&
                        data.authenticate.accessToken
                    ) {
                        redirect('/');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const initialValues = {
        username: '',
        password: '',
        passwordConfirm: '',
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .min(1, 'Username must be between 1 and 30 characters')
            .max(30, 'Username must be between 1 and 30 characters'),
        password: yup
            .string()
            .required('Password is required')
            .min(5, 'Password must be between 5 and 50 characters')
            .max(50, 'Password must be between 5 and 50 characters'),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required'),
    });
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => <SignUpFormBase onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignUpForm;
