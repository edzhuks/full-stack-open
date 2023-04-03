import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const { data, _, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
    const [repositories, setRepositories] = useState(undefined);

    useEffect(() => {
        if (!loading) {
            setRepositories(data.repositories);
        }
    }, [loading]);

    return { repositories, loading, refetch: refetch };
};

export default useRepositories;
