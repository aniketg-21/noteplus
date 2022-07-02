import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const ref = useRef(null);

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "private",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    ref.current.click();
    props.showAlert(`Note - '${note.title}' added successfully.`, "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="modal fade"
      id="newNoteModal"
      tabIndex="-1"
      aria-labelledby="newNoteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Note+</h5>
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
                  id="title"
                  name="title"
                  onChange={onChange}
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
                  id="description"
                  name="description"
                  rows="3"
                  onChange={onChange}
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
                  id="tag"
                  name="tag"
                  onChange={onChange}
                  minLength={3}
                  required
                />
              </div>
              <div className="modal-footer pb-0">
                <button
                  type="reset"
                  className="btn btn-primary col-2"
                  disabled={
                    note.title.length < 1 || note.description.length < 1
                  }
                >
                  Reset
                </button>
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

export default AddNote;
