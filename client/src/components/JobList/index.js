import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs, title }) => {
  if (!jobs.length) {
    return <h3>No Jobs Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {jobs &&
        jobs.map(job => (
          <div key={job._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${job.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
                >
                {job.username}
              </Link>{' '}
              job on {job.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/job/${job._id}`}>
                <p>{job.jobText}</p>
                <p className="mb-0">
                  Reactions: {job.reactionCount} || Click to{' '}
                  {job.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;