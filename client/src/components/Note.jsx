import { Link } from 'react-router-dom';

function Note({ id, title, body }) {
  return (
    <Link to={`/notes/${id}`}>
      <h3>{title}</h3>
      <p>{body}</p>
    </Link>
  );
}

export default Note;
