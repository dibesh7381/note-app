import { useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const [editingNote, setEditingNote] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📝 Notes App
      </h1>

      <div className="max-w-md sm:max-w-lg mx-auto">
        <NoteForm editingNote={editingNote} setEditingNote={setEditingNote} />
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <NoteList onEdit={setEditingNote} />
      </div>
    </div>
  );
};

export default App;







