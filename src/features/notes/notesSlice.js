import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

const loadFromLocalStorage = () => {
   return JSON.parse(localStorage.getItem('notes')) || []
};


const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: loadFromLocalStorage(),
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
      saveToLocalStorage(state.notes);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveToLocalStorage(state.notes);
    },
    updateNote: (state, action) => {
      const { id, title, note } = action.payload;
      const existingNote = state.notes.find((n) => n.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.note = note;
        saveToLocalStorage(state.notes);
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;

