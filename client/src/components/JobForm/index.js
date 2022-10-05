import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_JOB } from '../../utils/mutations';
import { QUERY_JOBS, QUERY_ME } from '../../utils/queries';

const JobForm = () => {
  const [jobText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addJob, { error }] = useMutation(ADD_JOB, {
    update(cache, { data: { addJob } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
      const { jobs } = cache.readQuery({ query: QUERY_JOBS });
      cache.writeQuery({
        query: QUERY_JOBS,
        data: { jobs: [addJob, ... jobs] }
      });
    } catch (e) {
      console.error(e);
    }

    const { me } = cache.readQuery({ query: QUERY_ME });
    cache.writeQuery({
      query: QUERY_ME,
      data: { me: { ...me, jobs: [...me.jobs, addJob] } }
    });
  }
});

  const handleChange = event => {
    if (event.target.value.length <= 1000) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      //add job to database
      await addJob({
        variables: { jobText }
      });

      //clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 1000 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/1000
        {error && <span className='ml-2'>Something went wrong...</span>}
      </p>

      <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Here's a new thought..."
          value={jobText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;