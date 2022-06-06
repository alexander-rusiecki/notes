import { Link } from 'react-router-dom';

function Note({ id, title }) {
  return (
    <Link to={`/notes/${id}`}>
      <h3>{title}</h3>
    </Link>
  );
}

export default Note;
