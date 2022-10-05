import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_JOB } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

const SingleJob = props => {
  const { id: jobId } = useParams();
  const { loading, data } = useQuery(QUERY_JOB, {
    variables: { id: jobId }
  });

  const job = data?.job || {};

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {job.username}
          </span>{' '}
          job on {job.createdAt}
        </p>
        <div className="card-body">
          <p>{job.jobText}</p>
        </div>
      </div>
      {job.reactionCount > 0 && <ReactionList reactions={job.reactions} />}
      {Auth.loggedIn() && <ReactionForm jobId={job._id} />}
    </div>
  );
};

export default SingleJob;
