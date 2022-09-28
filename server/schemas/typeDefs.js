//import the gql tagged function

const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
  type Job {
    _id: ID
    jobText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Campground {
    _id: ID
    campgroundName: String
    createdAt: String
    campgroundState: String
    campgroundCity: String
    campgroundEmail: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    jobs: [Job]
    friends: [User]

  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

   type Auth {
    token: ID!
    user: User
  } 

  type Query {
    me: User
    users: [User]
    user(username: String): User
    jobs(username: String): [Job]
    job(_id: ID): Job
    campgrounds: [Campground]
    campground(_id: ID): Campground
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addJob(jobText: String!): Job
    addReaction(jobId: ID!, reactionBody: String!): Job
    addFriend(friendId: ID!): User
  }
`;

//export the typeDefs
module.exports = typeDefs;