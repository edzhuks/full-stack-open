import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repositories(
        $orderDirection: OrderDirection
        $orderBy: AllRepositoriesOrderBy
        $searchKeyword: String
        $first: Int
        $after: String
    ) {
        repositories(
            orderDirection: $orderDirection
            orderBy: $orderBy
            searchKeyword: $searchKeyword
            first: $first
            after: $after
        ) {
            totalCount
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
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query repo($id: ID!, $first: Int, $after: String) {
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
            reviews(first: $first, after: $after) {
                totalCount
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
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
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
                            id
                        }
                    }
                }
            }
        }
    }
`;
