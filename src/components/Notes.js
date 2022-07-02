import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import UpdateNote from "./UpdateNote";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, delNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "private",
  });

  const uNote = (note) => {
    setNote(note);
  };
  const dNote = (note) => {
    setNote(note);
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <UpdateNote
        uNote={uNote}
        showAlert={props.showAlert}
        note={note}
        setNote={setNote}
      />
      <div
        className="modal fade"
        tabIndex="-1"
        id="delModal"
        aria-labelledby="delModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="delModalLabel">
                <b>Note Title : </b>
                {note.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6>
                Are you sure you want to delete this note? It will be deleted
                permanently.
              </h6>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={(e) => {
                    delNote(note._id);
                    e.currentTarget.nextSibling.click();
                    props.showAlert(
                      `Note - '${note.title}' deleted successfully.`,
                      "success"
                    );
                  }}
                >
                  Ok
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark rounded text-light d-flex justify-content-between p-2 ps-4 pe-4">
        <h1>Your Notes</h1>
        <button
          className="btn btn-light align-self-center"
          data-bs-toggle="modal"
          data-bs-target="#newNoteModal"
        >
          New Note+
        </button>
      </div>
      <div className="row">
        {notes.length === 0 ? (
          <div className="m-2">
            <span>No notes to display. Click here to</span>
            <a
              href="#newNoteModal"
              className="p-2 text-primary text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#newNoteModal"
            >
              Add Note+
            </a>
          </div>
        ) : ( 
          notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                uNote={uNote}
                dNote={dNote}
                showAlert={props.showAlert}
                note={note}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Notes;
