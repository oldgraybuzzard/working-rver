const faker = require('faker');

const db = require('../config/connection');
const { Job, User, Campground } = require('../models');

db.once('open', async () => {
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

  const createdUsers = await User.collection.insertMany(userData);

  //create friends
for (let i = 0; i < 50; i += 1) {
  const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  const { _id: userId } = createdUsers.ops[randomUserIndex];

  let friendId = userId;

  while (friendId === userId) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    friendId = createdUsers.ops[randomUserIndex];
  }
  await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
}

//create job
let createdJobs = [];
for (let i = 0; i < 50; i += 1) {
  const jobText = faker.lorem.sentence();

  const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  const { username, _id: userId } = createdUsers.ops[randomUserIndex];
  
  const createdJob = await Job.create({ jobText, username });

  const updatedUser = await User.updateOne(
    { _id: userId },
    { $push: { jobs: createdJob } }
  );

  createdJobs.push(createdJob);
}

  // create camp grounds
 const campgroundData = [];

  for (let i = 0; i < 50; i += 1) {
    const campgroundName = faker.company.companyName();
    const campgroundState = faker.address.stateAbbr();
    const campgroundCity = faker.address.city();
    const campgroundEmail = faker.internet.email();

    campgroundData.push({ campgroundName, campgroundState, campgroundCity, campgroundEmail });
  }

const createdCampground = await Campground.collection.insertMany(campgroundData);

// create reaction
for (let i=0; i < 50; i += 1) {
  const reactionBody = faker.lorem.sentence();

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

  console.log('DB is seeded!');
  process.exit(0);
});
