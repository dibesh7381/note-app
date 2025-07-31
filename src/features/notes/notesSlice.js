import { createSlice } from '@reduxjs/toolkit';


const saveToStorage = (notes) => {
  return localStorage.setItem('notes', JSON.stringify(notes))
}

const loadFromStorage = () => {
  return JSON.parse(localStorage.getItem('notes')) || []
}



const initialState = {
   items: loadFromStorage()
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.items.push(action.payload);
      saveToStorage(state.items);
    },
    deleteNote: (state, action) => {
      state.items = state.items.filter((note) => note.id !== action.payload);
      saveToStorage(state.items);
    },
    updateNote: (state, action) => {
      const { id, title, note } = action.payload;
      const existing = state.items.find((n) => n.id === id);
      if (existing) {
        existing.title = title;
        existing.note = note;
        saveToStorage(state.items);
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;





