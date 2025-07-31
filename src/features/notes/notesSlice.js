// import { createSlice } from "@reduxjs/toolkit";

// const saveToStorage = (state) => {
//    return localStorage.setItem("notes",JSON.stringify(state))
// }

// const loadFromStorage = () => {
//    return JSON.parse(localStorage.getItem("notes")) || []
// }

// const initialState = {
//   items : loadFromStorage()
// }

// const notesSlice = createSlice({
//    name : 'note',
//    initialState,
//    reducers : {
//      addNote : (state,action) => {
//         state.items.push({...action.payload, timestamp : new Date().toLocaleString()})
//         saveToStorage(state.items)
//      },
//      deleteNote : (state,action) => {
//        state.items = state.items.filter(i => i.id !== action.payload)
//        saveToStorage(state.items)
//      },
//      updateNote : (state,action) => {
//        const {id , title, note} = action.payload
//        const exists = state.items.find(i => i.id === id)
//        if (exists) {
//          exists.title = title,
//          exists.note = note,
//          exists.timestamp = new Date().toLocaleString()
//        }
//        saveToStorage(state.items)
//      }
//    }
// })

// export const { addNote, deleteNote, updateNote } = notesSlice.actions;
// export default notesSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const saveToStorage = (state) => {
   return localStorage.setItem("notes",JSON.stringify(state))
}

const loadFromStorage = () => {
   return JSON.parse(localStorage.getItem("notes")) || []
}

const initialState = {
   items : loadFromStorage()
}

const noteSlice = createSlice({
  name : "note",
  initialState,
  reducers : {
      addNote : (state,action) => {
         state.items.push({...action.payload, timestamp : new Date().toLocaleString()})
         saveToStorage(state.items)
      },
      deleteNote : (state,action) => {
         state.items =  state.items.filter(i => i.id == action.payload)
         saveToStorage(state.items)
      },
      updateNote : (state,action) => {
         const exists =  state.items.find(i => i.id === action.payload.id)
         if (exists) {
           exists.title = action.payload.title
           exists.note = action.payload.title
           exists.timestamp = new Date().toLocaleString()
         }
         saveToStorage(state.items)
      }
  }
})

export const {addNote,deleteNote,updateNote} = noteSlice.actions

export default noteSlice.reducer

