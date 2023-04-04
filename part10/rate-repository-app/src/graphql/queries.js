import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repositories(
        $orderDirection: OrderDirection
        $orderBy: AllRepositoriesOrderBy
        $searchKeyword: String
    ) {
        repositories(
            orderDirection: $orderDirection
            orderBy: $orderBy
            searchKeyword: $searchKeyword
        ) {
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
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
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
                        repository {
                            fullName
                        }
                    }
                }
            }
        }
    }
`;
