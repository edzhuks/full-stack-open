import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import BigButton from './BigButton';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
    form: {
        backgroundColor: theme.colors.foreground,
    },
    signinButton: {
        margin: theme.paddings.cardContent,
    },
});

const ReviewFormBase = ({ onSubmit }) => {
    return (
        <View style={styles.form}>
            <FormikTextInput
                name="ownerName"
                placeholder="Repository owner's username"
            />
            <FormikTextInput name="repoName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating (1-100)" />
            <FormikTextInput name="review" placeholder="Review" multiline />

            <BigButton
                style={styles.signinButton}
                onClick={onSubmit}
                text="Sign In"
            />
        </View>
    );
};

const ReviewForm = () => {
    const redirect = useNavigate();
    const [createReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { ownerName, repoName, rating, review } = values;

        try {
            const { data } = await createReview({
                ownerName,
                repoName,
                rating: parseInt(rating),
                review,
            });
            if (data) {
                redirect(`/repositories/${data.createReview.repositoryId}`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const initialValues = {
        ownerName: '',
        repoName: '',
        rating: '',
        review: '',
    };

    const validationSchema = yup.object().shape({
        ownerName: yup.string().required("Owner's username is required"),
        repoName: yup.string().required('Repository name is required'),
        rating: yup
            .number()
            .min(0)
            .max(100)
            .required('Repository name is required'),
        review: yup.string(),
    });
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => <ReviewFormBase onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default ReviewForm;
