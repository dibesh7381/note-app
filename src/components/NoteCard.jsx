import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../features/notes/notesSlice';
import { useState } from 'react';

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [titleText, setTitleText] = useState(note.title);
  const [noteText, setNoteText] = useState(note.note);
  const [errors, setErrors] = useState({ title: '', note: '' });

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitleText(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNoteText(value);
    if (errors.note) {
      setErrors((prev) => ({ ...prev, note: '' }));
    }
  };

  const handleUpdate = () => {
    const trimmedTitle = titleText.trim();
    const trimmedNote = noteText.trim();
    const newErrors = { title: '', note: '' };
    let hasError = false;

    if (trimmedTitle.length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
      hasError = true;
    }

    if (trimmedNote.length < 10) {
      newErrors.note = 'Note must be at least 10 characters.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    dispatch(updateNote({ id: note.id, title: trimmedTitle, note: trimmedNote }));
    setEditMode(false);
  };

  const handleCancel = () => {
    setTitleText(note.title);
    setNoteText(note.note);
    setErrors({ title: '', note: '' });
    setEditMode(false);
  };

  return (
    <div className="w-full bg-white shadow-md p-4 rounded-xl">
      {editMode ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <input
              type="text"
              className="p-2 border rounded-md"
              value={titleText}
              onChange={handleTitleChange}
              placeholder="Enter title"
              autoFocus
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">{errors.title}</span>
            )}
          </div>

          <div className="flex flex-col">
            <textarea
              className="p-2 border rounded-md min-h-[80px]"
              value={noteText}
              onChange={handleNoteChange}
              placeholder="Enter your note"
            />
            {errors.note && (
              <span className="text-red-500 text-sm mt-1">{errors.note}</span>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
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
          {note.timestamp && (
            <p className="text-sm text-gray-500 mt-2">🕒 {note.timestamp}</p>
          )}
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








