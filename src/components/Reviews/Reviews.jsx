import { getMovieReview } from '../../Service/Api';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getMovieReview(movieId)
      .then(data => setReviews(data.results || []));
  }, [movieId]);
  return (
    <ul className="list-group list-group-flush">
      {reviews.length > 0 ? (
        reviews.map(review => (
          <li key={review.id} className="list-group-item">
            <h3 className="card-title">{review.author}</h3>
            <p className="card-text">{review.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews found</p>
      )}
    </ul>
  );
}
export default Reviews;
