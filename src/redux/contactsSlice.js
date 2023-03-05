import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'services/api';
const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  // Добавляем обработку внешних экшенов
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contacts.splice(index, 1);
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;

// reducers: {
//   addContact(state, action) {
//     state.contacts.push(action.payload);
//   },
//   deleteContact(state, action) {
//     return {
//       contacts: state.contacts.filter(
//         contact => contact.id !== action.payload
//       ),
//     };
//   },
// export const { addContact, deleteContact } = contactsSlice.actions;

//========localStorage=========
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// const persistConfig = {
//   key: 'contacts',
//   storage,
// };
// export const contactsReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );
