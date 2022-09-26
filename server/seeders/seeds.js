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

  // create camp grounds
 const jobData = [];

  for (let i = 0; i < 50; i += 1) {
    const jobText = faker.lorem.sentence();
    const createdAt = faker.date.between('2022-01-01T00:00:00.000Z', '2022-09-01T00:00:00.000Z');

    jobData.push({ jobText, createdAt });
  }

const createdJob = await Job.collection.insertMany(jobData);

// //create reactions
//   for (let i = 0; i < 100; i += 1) {
//     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username } = createdUsers.ops[randomUserIndex];

//     const randomJobIndex = Math.floor(Math.random() * createdJob.length);
//     const { _id: jobId } = createdJob[randomJobIndex];

//     await Job.updateOne(
//       { _id: jobId },
//       { $push: { reactions: { reactionBody, username } } },
//       { runValidators: true }
//     );
//   }

  console.log('all done!');
  process.exit(0);
});
