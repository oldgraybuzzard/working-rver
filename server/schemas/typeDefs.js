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




  type Query {
    jobs: [Job]
  }
`;

//export the typeDefs
module.exports = typeDefs;