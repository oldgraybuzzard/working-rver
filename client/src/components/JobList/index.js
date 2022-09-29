import React from 'react';

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
              {job.username}
              job on {job.createdAt}
            </p>
            <div className="card-body">
              <p>{job.jobText}</p>
              <p className="mb-0">
                Reactions: {job.reactionCount} || Click to{' '}
                {job.reactionCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;