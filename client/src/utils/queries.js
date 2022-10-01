import { gql } from '@apollo/client';

export const QUERY_JOBS = gql`
  query jobs($username: String) {
    jobs(username: $username) {
      _id
      jobText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
  `;

  export const QUERY_JOB = gql`
  query job($id: ID!) {
    job(_id: $id) {
      _id
      jobText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      jobs {
        _id
        jobText
        createdAt
        reactionCount
      }
    }
  }
  `;