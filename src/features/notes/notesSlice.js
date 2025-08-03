// import { createSlice } from '@reduxjs/toolkit';

// const saveToLocalStorage = (notes) => {
//   localStorage.setItem('notes', JSON.stringify(notes));
// };

// const loadFromLocalStorage = () => {
//    return JSON.parse(localStorage.getItem('notes')) || []
// };


// const notesSlice = createSlice({
//   name: 'notes',
//   initialState: {
//     notes: loadFromLocalStorage(),
//   },
//   reducers: {
//     addNote: (state, action) => {
//       state.notes.push(action.payload);
//       saveToLocalStorage(state.notes);
//     },
//     deleteNote: (state, action) => {
//       state.notes = state.notes.filter((note) => note.id !== action.payload);
//       saveToLocalStorage(state.notes);
//     },
//     updateNote: (state, action) => {
//       const existingNote = state.notes.find((n) => n.id === action.payload.id);
//       if (existingNote) {
//         existingNote.title = action.payload.title;
//         existingNote.note = action.payload.note;
//         saveToLocalStorage(state.notes);
//       }
//     },
//   },
// });

// export const { addNote, deleteNote, updateNote } = notesSlice.actions;
// export default notesSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (notes) => {
   localStorage.setItem('notes',JSON.stringify(notes))
}

const loadFromLocalStorage = () => {
   return JSON.parse(localStorage.getItem('notes')) || []
}

const initialState = {
   notes : loadFromLocalStorage()
}
const notesSlice = createSlice({
   name : 'note',
   initialState,
   reducers : {
       addNote :  (state,action) => {
          state.notes.push(action.payload)
          saveToLocalStorage(state.notes)
       },
       deleteNote : (state,action) => {
          state.notes = state.notes.filter(i => i.id !== action.payload)
          saveToLocalStorage(state.notes)
       },
       updateNote : (state,action) => {
          const exists = state.notes.find(i => i.id === action.payload.id)
          if (exists) {
             exists.title = action.payload.title
             exists.note = action.payload.note
             saveToLocalStorage(state.notes)
          }
       }
   }
})


export const {addNote,deleteNote,updateNote} = notesSlice.actions

export default notesSlice.reducer