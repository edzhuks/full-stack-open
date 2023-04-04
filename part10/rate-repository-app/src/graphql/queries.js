import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repositories(
        $orderDirection: OrderDirection
        $orderBy: AllRepositoriesOrderBy
    ) {
        repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
            edges {
                node {
                    description
                    forksCount
                    language
                    id
                    fullName
                    ownerAvatarUrl
                    ratingAverage
                    reviewCount
                    stargazersCount
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query repo($id: ID!) {
        repository(id: $id) {
            id
            fullName
            url
            description
            language
            ownerAvatarUrl
            ratingAverage
            reviewCount
            stargazersCount
            forksCount
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;
