const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema(
  {
    jobText: {
      type: String,
      required: 'You need to enter a description!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

jobSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Job = model('Job', jobSchema);

module.exports = Job;
