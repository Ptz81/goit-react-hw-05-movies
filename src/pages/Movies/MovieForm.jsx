import React, { useState, useEffect } from "react";
import css from './Movies.module.css';
import { useSearchParams, useNavigate } from "react-router-dom";

const MovieForm = ({ formSubmit, search }) => {
  //Початкове значення стану search (значення пошуку). якщо search є null або undefined, то використовується пустий рядок ''.
  const [value, setValue] = useState(search || '');
  //навігація по сторінках
  const navigate = useNavigate();
  //доступ до параметрів запиту URL і можливість змінювати їх.
  const [searchParams, setSearchParams] = useSearchParams();
// синхронізація поля вводу і параметром запиту URL
  useEffect(() => {
    if (search !== value) {
      setValue(search || '');
    }
  }, [value, search]);
//функція зміни значення у полі вводу
  const handleChange = (e) => {
    //Зчитується нове значення поля вводу, яке було введено користувачем.
    const newValue = e.target.value;
    //оновлення стану
    setValue(newValue);
    //оновлення параметра запиту URL - відбудеться синхронізація між значенням поля вводу і параметром запиту URL.
    setSearchParams({ search: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit(value);
  };

  const handleClear = () => {
    setValue('');
    setSearchParams({ search: '' });
    navigate('/');
  };

  return (
    <div>
      <form className={css.form} role='search' onSubmit={handleSubmit}>
        <input
          className='form-control me-2'
          type='search'
          placeholder={search ? 'start searching the movie...' : ''}
          aria-label='Search'
          onChange={handleChange}
          value={value}
        />
        <button className='btn btn-outline-success' type='submit'>
          Search
        </button>
        {search && (
          <button className='btn btn-outline-danger' type='button' onClick={handleClear}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default MovieForm;
