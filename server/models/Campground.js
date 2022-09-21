const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const campgroundSchema = new Schema(
  {
    campgroundName: {
      type: String,
      required: 'Please enter the name of a campground',
      minlength: 1,
      maxlength: 280
    },
    campgroundState: {
      type: String,
      required: 'Use 2 letter abbreviation for state',
      minlength: 1,
      maxlength: 2
    },
    campgroundCity: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 32
    },
    campgroundEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

campgroundSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Campground = model('Campground', campgroundSchema);

module.exports = Campground;
