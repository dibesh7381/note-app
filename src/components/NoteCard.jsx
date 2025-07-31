import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../features/notes/notesSlice';
import { useState } from 'react';

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.note);

  const handleUpdate = () => {
    if (title.trim() && noteText.trim()) {
      dispatch(updateNote({ id: note.id, title, note: noteText }));
      setEditMode(false);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg bg-white shadow-md p-4 rounded-xl relative mx-auto">
      {editMode ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="p-2 border rounded-md min-h-[80px]"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setTitle(note.title);
                setNoteText(note.note);
                setEditMode(false);
              }}
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-blue-700 break-words">{note.title}</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap break-words">{note.note}</p>

          <p className="text-sm text-gray-500 mt-2">
            🕒 {note.timestamp}
          </p>

          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={() => setEditMode(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteNote(note.id))}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;






