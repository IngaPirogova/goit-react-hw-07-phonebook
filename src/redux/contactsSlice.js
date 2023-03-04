import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact } from 'services/api';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  // Добавляем обработку внешних экшенов
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },  

// Код остальных редюсеров
[addContact.pending](state) {
  state.isLoading = true;
},
[addContact.fulfilled](state, action) {
  state.isLoading = false;
  state.error = null;
  state.contacts.push(action.payload);
},
[addContact.rejected](state, action) {
  state.isLoading = false;
  state.error = action.payload;
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

  export const { deleteContact } = contactsSlice.actions;

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
