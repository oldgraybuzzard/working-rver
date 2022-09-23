const faker = require('faker');

const db = require('../config/connection');
const { Job, User, Campground, Reaction } = require('../models');

db.once('open', async () => {
  await Reaction.deleteMany({});
  await Campground.deleteMany({});
  await Job.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdCampgrounds = await Campground.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdCampgrounds.ops.length);
    const { _id: campgroundId } = createdCampgrounds.ops[randomCampgroundIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create jobs
  let createdJobs = [];
  for (let i = 0; i < 100; i += 1) {
    const jobText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdJob = await Job.create({ jobText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { jobss: createdJob._id } }
    );

    createdJobs.push(createdJob);
  }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomJobIndex = Math.floor(Math.random() * createdJobs.length);
    const { _id: jobId } = createdJobs[randomJobIndex];

    await Job.updateOne(
      { _id: jobId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
