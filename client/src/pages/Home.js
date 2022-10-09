import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
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
  // console.log(jobs);

  //pagination area
  const [pageNumber, setPageNumber] = useState(0);
  const jobsPerPage = 10;
  const pagesVisited = pageNumber * jobsPerPage;

  const displayJobs = jobs.slice(pagesVisited, pagesVisited + jobsPerPage).map((jobs) => {
    return (
     jobs
    );
  });

  const pageCount = Math.ceil(jobs.length / jobsPerPage);

  const changePage =  ({selected}) => {
    setPageNumber(selected);
  }
  // end pagination

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
           <JobList jobs={displayJobs} 
           title="Seeking RV'ers...."/>

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
      <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButtons"}
              previousLinkClassName={"previousButton"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
      />
    </main>
  );
};

export default Home;
