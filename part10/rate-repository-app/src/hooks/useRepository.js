import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
    const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
    });
    const [repository, setRepository] = useState(undefined);

    useEffect(() => {
        if (!loading) {
            setRepository(data.repository);
        }
    }, [loading]);

    return { repository, loading, refetch: refetch };
};

export default useRepository;
