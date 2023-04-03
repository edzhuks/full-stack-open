import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async ({ ownerName, repoName, rating, review }) => {
        const result = await mutate({
            variables: {
                review: {
                    ownerName,
                    repositoryName: repoName,
                    rating,
                    text: review,
                },
            },
        });
        return result;
    };

    return [createReview, result];
};

export default useCreateReview;
