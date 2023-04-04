import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedSort, searchQuery, first) => {
    const variables = {
        orderBy: selectedSort === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
        orderDirection: selectedSort === 'lowestRated' ? 'ASC' : 'DESC',
        searchKeyword: searchQuery,
        first,
    };
    const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables,
    });
    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }
        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };
    return {
        repositories: data?.repositories,
        loading,
        fetchMore: handleFetchMore,
    };
};

export default useRepositories;
