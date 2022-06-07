function Note({ title, createdAt }) {
  return (
    <div>
      <h2>{title}</h2>
      <small className="created-at">
        created: {createdAt.toString().substring(0, 10)}
      </small>
    </div>
  );
}

export default Note;
