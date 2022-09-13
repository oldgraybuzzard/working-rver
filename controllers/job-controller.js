const { Job } = require('../models');

const jobController = {
  //get all jobs
  getAllJob(req, res) {
    Job.find({})
    .then(dbJobData => res.json(dbJobData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  //get one job by id
  getJobById({ params}, res) {
    Job.findOne({ _id: params.id })
    .then(dbJobData => {
      //if no job is found, send 404
      if (!dbJobData) {
        res.status(404).json({ message: 'No job found with that id!' });
        return;
      }
      res.json(dbJobData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  //create job
  createJob({ body }, res) {
    Job.create(body)
    .then(dbJobData => res.json(dbJobData))
    .catch(err => res.status(400).json(err));
  },
  //update job nby id
  updateJob({ params, body }, res) {
    Job.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbJobData => {
      if (!dbJobData) {
        res.status(404).json({ message: 'No job found with that id!' });
        return;
      }
      res.json(dbJobData);
    })
    .catch(err => res.status(400).json(err));
  },
  //delete a job
  deleteJob({ params }, res) {
    Job.findOneAndDelete({ _id: params.id })
    .then(dbJobData => {
      if (!dbJobData) {
        res.status(404).json({ message: 'No job found with this id!' });
        return;
      }
      res.json(dbJobData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = jobController;