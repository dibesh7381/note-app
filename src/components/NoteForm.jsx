import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../features/notes/notesSlice';
import { nanoid } from 'nanoid';

const NoteForm = ({ editingNote, setEditingNote }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({ title: '', note: '' });

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setNote(editingNote.note);
      setErrors({ title: '', note: '' });
    } else {
      setTitle('');
      setNote('');
      setErrors({ title: '', note: '' });
    }
  }, [editingNote]);

  const validate = () => {
    const newErrors = { title: '', note: '' };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'Title is required.';
      isValid = false;
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
      isValid = false;
    }

    if (!note.trim()) {
      newErrors.note = 'Note content is required.';
      isValid = false;
    } else if (note.trim().length < 10) {
      newErrors.note = 'Note must be at least 10 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingNote) {
      dispatch(updateNote({ id: editingNote.id, title, note }));
      setEditingNote(null);
    } else {
      dispatch(addNote({ id: nanoid(), title, note }));
    }

    setTitle('');
    setNote('');
    setErrors({ title: '', note: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md sm:max-w-lg mx-auto p-4 bg-white shadow-md rounded-md flex flex-col gap-4"
    >
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Note Title"
          className="p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>}
      </div>

      <div className="flex flex-col">
        <textarea
          placeholder="Write your note here..."
          className="p-2 border rounded-md min-h-[100px] resize-none"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        {errors.note && <span className="text-red-500 text-sm mt-1">{errors.note}</span>}
      </div>

      <button
        type="submit"
        className="self-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {editingNote ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default NoteForm;





