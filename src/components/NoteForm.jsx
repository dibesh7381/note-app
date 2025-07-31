import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../features/notes/notesSlice';
import { nanoid } from 'nanoid';

const NoteForm = ({ editingNote, setEditingNote }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setNote(editingNote.note);
    } else {
      setTitle('');
      setNote('');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !note) return;

    if (editingNote) {
      dispatch(updateNote({ id: editingNote.id, title, note }));
      setEditingNote(null);
    } else {
      dispatch(addNote({ id: nanoid(), title, note }));
    }

    setTitle('');
    setNote('');
  };

  return (
       <form
  onSubmit={handleSubmit}
  className="w-full max-w-md sm:max-w-lg mx-auto p-4 bg-white shadow-md rounded-md flex flex-col gap-4"
>
  <input
    type="text"
    placeholder="Note Title"
    className="p-2 border rounded-md"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <textarea
    placeholder="Write your note here..."
    className="p-2 border rounded-md min-h-[100px] resize-none"
    value={note}
    onChange={(e) => setNote(e.target.value)}
  />

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




