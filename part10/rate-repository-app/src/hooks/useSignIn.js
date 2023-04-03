import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import { useAuthStorage } from '../hooks/useAuthStorage';
const useSignIn = () => {
    // const authStorage = useContext(AuthStorageContext);
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGN_IN);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const result = await mutate({
            variables: { credentials: { username, password } },
        });
        const { data } = result;
        if (data && data.authenticate) {
            await authStorage.setAccessToken(data.authenticate.accessToken);
            apolloClient.resetStore();
        }
        return result;
    };

    return [signIn, result];
};

export default useSignIn;
