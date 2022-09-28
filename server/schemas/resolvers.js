const { User, Job, Reaction, Campground } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
      const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        .populate('jobs')
        .populate('friends');

      return userData;
      }

      throw new AuthenticationError('Not logged in')
    },
    jobs: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Job.find(params).sort({ createdAt: -1 });
    },
    job: async (parent, { _id }) => {
      return Job.findOne({ _id });
    },
    campgrounds: async () => {
      return Campground.find().sort({ createdAt: -1 });
    },
    campground: async (parent, { _id }) => {
      return Campground.findOne({ _id });
    },
    //get all users
    users: async () => {
      return User.find()
      .select('-__v -password')
      .populate('friends')
      .populate('jobs');
    },
    //get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select('-__v -password')
      .populate('friends')
      .populate('jobs');
    }
  },
  Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return {token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
      },
      addJob: async (parent, args, context) => {
        if (context.user) {
          const job = await Job.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { jobs: job._id } },
            { new: true }
          );
      
          return job;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addReaction: async (parent, { jobId, reactionBody }, context) => {
        if (context.user) {
          const updatedJob = await Job.findOneAndUpdate(
            { _id: jobId },
            { $push: { reactions: { reactionBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
          return updatedJob;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');

          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      }
    }  
};

module.exports = resolvers;