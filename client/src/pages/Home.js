import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_JOBS } from '../utils/queries';
import JobList from '../components/JobList';

const Home = () => {
   // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_JOBS);
  const jobs = data?.jobs || [];
  console.log(jobs);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{/* PRINT JOB LIST */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <JobList jobs={jobs} title="Seeking RV'ers...."/>
        )}
        </div>
      </div>
    </main>
  );
};

export default Home;
