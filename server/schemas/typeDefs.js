//import the gql tagged function

const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
  type Job {
    _id: ID
    jobText: String
    createdAt: String
    userName: String
  }

  type Campground {
    _id: ID
    campgroundName: String
    createdAt: String
    campgroundState: String
    campgroundCity: String
    campgroundEmail: String
  }

  type Reaction {
    _id: ID
    reactionBody: String
  }

  type Query {
    jobs: [Job]
    campgrounds: [Campground]
    reaction: [Reaction]
  }
`;

//export the typeDefs
module.exports = typeDefs;