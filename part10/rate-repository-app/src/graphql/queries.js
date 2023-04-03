import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
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

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;
