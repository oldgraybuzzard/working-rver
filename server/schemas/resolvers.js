const { User, Job, Reaction, Campground } = require("../models");

const resolvers = {
  Query: {
    jobs: async () => {
      return Job.find().sort({ createdAt: -1 });
    },
    campgrounds: async () => {
      return Campground.find().sort({ createdAt: -1 });
    },
    user: async () => {
      return User.find().sort({ createdAt: -1 });
    }
  }
};

module.exports = resolvers;