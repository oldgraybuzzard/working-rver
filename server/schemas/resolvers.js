const { User, Job, Reaction } = require("../models");

const resolvers = {
  Query: {
    jobs: async () => {
      return Job.find().sort({ createdAt: -1 });
    }
  }
};

module.exports = resolvers;