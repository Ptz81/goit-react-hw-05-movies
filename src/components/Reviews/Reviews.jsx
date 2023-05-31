import { getMovieReview } from '../../Service/Api';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from './Reviews.module.css'

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getMovieReview(movieId)
      .then(data => setReviews(data.results || []));
  }, [movieId]);
  return (
    <ul className={css.list_item}>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <li key={review.id} className={css.item}>
            <h3 className={css.item_title}>{review.author}</h3>
            <p className={css.item_text}>{review.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews found</p>
      )}
    </ul>
  );
}
export default Reviews;
