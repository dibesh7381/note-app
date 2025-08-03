import { useSelector } from 'react-redux';
import NoteCard from './NoteCard';

const NoteList = () => {
  const notes = useSelector((state) => state.notes.notes);

  if (!notes || notes.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-6">
        No notes yet. Start writing something!
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full px-4">
      {notes.map((note) => (
        <div key={note.id} className="w-full max-w-md sm:max-w-lg">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;




