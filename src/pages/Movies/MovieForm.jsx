import React, { useState } from "react";
import css from './Movies.module.css'

const MovieForm = ({ formSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit(value);
  };
// 'd-flex mt-2'
  return (
    <form className={css.form} role='search' onSubmit={handleSubmit}>
      <input
        className='form-control me-2'

        type='search'
        placeholder='Type movie'
        aria-label='Search'
        onChange={handleChange}
        value={value}
      />
      <button className='btn btn-outline-success' type='submit'>
        Search
      </button>
    </form>
  );
};

export default MovieForm;
