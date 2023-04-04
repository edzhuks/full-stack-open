import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedSort) => {
    const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            orderBy:
                selectedSort === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
            orderDirection: selectedSort === 'lowestRated' ? 'ASC' : 'DESC',
        },
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
