import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../features/notes/notesSlice';
import { nanoid } from 'nanoid';

const NoteForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (title.trim().length < 5) {
      err.title = 'Title must be at least 5 characters';
    }

    if (note.trim().length < 10) {
      err.note = 'Note must be at least 10 characters';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: nanoid(),
      title,
      note,
      timestamp: new Date().toLocaleString(),
    };

    dispatch(addNote(payload));

    setTitle('');
    setNote('');
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-md flex flex-col gap-4"
    >
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
          }}
          className={`p-2 border rounded-md ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
      </div>

      <div className="flex flex-col">
        <textarea
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            if (errors.note) setErrors((prev) => ({ ...prev, note: '' }));
          }}
          className={`p-2 border rounded-md min-h-[100px] resize-none ${errors.note ? 'border-red-500' : ''}`}
        />
        {errors.note && <span className="text-red-500 text-sm">{errors.note}</span>}
      </div>

      <button
        type="submit"
        className="self-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
};

export default NoteForm;







