import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📝 Notes App
      </h1>

      <div className="max-w-md sm:max-w-lg mx-auto">
        <NoteForm />
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <NoteList />
      </div>
    </div>
  );
};

export default App;








