export default function MovieForm({
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  onSave,
  hasError,
}) {
  return (
    <form onSubmit={onSave}>
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(event) => onChangeTitle(event.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          type="text"
          value={description}
          onChange={(event) => onChangeDescription(event.target.value)}
        />
      </div>
      <div className="button-container">
        <button type="submit">Guardar</button>
      </div>
      {hasError && <p className="error">Error</p>}
    </form>
  );
}
