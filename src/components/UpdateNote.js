import React, { useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";

const UpdateNote = (props) => {
  const context = useContext(noteContext);
  const { editNote } = context;
  const { note, setNote, showAlert } = props;
  const ref = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._id, note.title, note.description, note.tag);
    ref.current.click();
    showAlert(`Note - '${note.title}' updated successfully.`, "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="modal fade"
      id="editNoteModal"
      tabIndex="-1"
      aria-labelledby="editNoteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={ref}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edittitle"
                  name="title"
                  onChange={onChange}
                  value={note.title}
                  minLength={2}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="editdescription"
                  name="description"
                  rows="3"
                  onChange={onChange}
                  value={note.description}
                  minLength={6}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edittag"
                  name="tag"
                  onChange={onChange}
                  value={note.tag}
                  minLength={3}
                  required
                />
              </div>
              <div className="modal-footer pb-0">
                <button
                  type="submit"
                  className="btn btn-primary col-2"
                  onClick={handleClick}
                  disabled={
                    note.title.length < 2 || note.description.length < 6
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
