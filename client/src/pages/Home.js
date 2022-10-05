import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_JOBS, QUERY_ME_BASIC } from '../utils/queries';
import JobList from '../components/JobList';
import FriendList from '../components/FriendList';
import JobForm from '../components/JobForm';
import Auth from '../utils/auth';

const Home = () => {
   // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_JOBS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const jobs = data?.jobs || [];
  console.log(jobs);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <JobForm />
            </div>
        )}
        <div className={`col-12 mb-3' ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <JobList jobs={jobs} title="Seeking RV'ers...."/>
          )}
          </div>
            {loggedIn && userData ? (
              <div className="col-12 col-lg-3 mb-3">
                <FriendList
                  username={userData.me.username}
                  friendCount={userData.me.friendCount}
                  friends={userData.me.friends}
              />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
