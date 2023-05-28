import React, { useState } from "react";

const MovieForm = ({formSubmit}) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    formSubmit(value)
  };
  return (
    <>
      <form
        className='d-flex mt-2'
        role='search'
        onSubmit={handleSubmit}
      >
        <input
          className='form-control me-2 '
          type='search'
          placeholder='Search'
          aria-label='Search'
          onChange={handleChange}
          value={value}
        />
        <button className='btn btn-outline-success' type='submit'>
          Search
        </button>
      </form>
    </>
  )

}
export default MovieForm;

