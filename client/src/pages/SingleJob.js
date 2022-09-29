import React from 'react';

const SingleJob = props => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          job on createdAt
        </p>
        <div className="card-body">
          <p>Job Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
