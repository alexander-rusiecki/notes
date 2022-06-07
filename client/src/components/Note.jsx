function Note({ title, createdAt }) {
  return (
    <div>
      <h3>{title}</h3>
      <small className="created-at">created: {createdAt}</small>
    </div>
  );
}

export default Note;
