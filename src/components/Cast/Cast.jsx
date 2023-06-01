import { getMovieCredits } from '../../Service/Api';
import spareIMG from '../../components/img/spareIMG.png';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from './Cast.module.css'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieCredits( movieId)
      .then(data => setCast(data.cast || []));
  }, [movieId]);

  return (
    <ul className="list-group list-group-flush">
      {cast.map(actor => (
        <li key={actor.id} className='list-group-item'>
          {actor.profile_path ? (
            <img className={css.item_img} src={IMAGE_URL + actor.profile_path} alt={actor.name} />
          ) : (
            <img className={css.spare_img} src={spareIMG} alt={actor.name} />
          )}
          <p className="card-text">{actor.name}</p>
          <p className="card-text">Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default Cast;
