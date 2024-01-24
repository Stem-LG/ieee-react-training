import React from "react";
import ReactDOM from "react-dom/client";
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import { useState } from "react";

export default function App() {
    const [notes, setNotes] = useState([]);

    function addNote(formData) {
        formData.preventDefault();
        setNotes([...notes, formData.target.note.value]);
        formData.target.note.value = "";
    }

    function deleteNote(idx) {
        setNotes(notes.filter((_, i) => i != idx));
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "50px",
            }}
        >
            <div
                style={{
                    width: "500px",
                    padding: "20px",
                    borderRadius: "20px",
                    backgroundColor: "#88f",
                }}
            >
                <h1>My Notes</h1>

                <AddNoteForm addNote={addNote} />

                {notes.length > 0 ? (
                    <NoteList notes={notes} deleteNote={deleteNote} />
                ) : (
                    <p
                        style={{
                            textAlign: "center",
                        }}
                    >
                        No notes yet.
                    </p>
                )}
            </div>
        </div>
    );
}

function AddNoteForm({ addNote }) {
    return (
        <form
            onSubmit={addNote}
            style={{
                display: "flex",
                gap: "10px",
                margin: "17px 0",
            }}
        >
            <input
                type="text"
                name="note"
                placeholder="note"
                required
                style={{
                    flexGrow: "1",
                    padding: "0 10px",
                    height: "48px",
                    borderRadius: "5px",
                    fontSize: "18px",
                }}
            />
            <button
                type="submit"
                style={{
                    padding: "0 15px",
                    height: "48px",
                    borderRadius: "5px",
                    fontSize: "15px",
                }}
            >
                Add Note
            </button>
        </form>
    );
}

function Note({ note, idx, onDelete }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            style={{
                padding: "0 10px",
                height: "48px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {note}
            <button
                style={{
                    display: isHovered == false ? "none" : "",
                    border: "none",
                    background: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                }}
                onClick={() => onDelete(idx)}
            >
                🗑
            </button>
        </li>
    );
}

function NoteList({ notes, deleteNote }) {
    function List() {
        var l = [];
        for (var i = 0; i < notes.length; i++) {
            l.push(<Note note={notes[i]} idx={i} onDelete={deleteNote} />);
        }
        return l;
    }

    return <div><List/></div>;
}