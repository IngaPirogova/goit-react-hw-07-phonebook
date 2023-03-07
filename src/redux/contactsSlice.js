import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'services/api';

const handlePending = state => {
  state.isLoading = true;
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
    [fetchContacts.pending]:handlePending,
    [fetchContacts.fulfilled](state, action) {
        state.isLoading = false;
        state.contacts = action.payload;
    },
    [fetchContacts.rejected](state, action) {
        state.error = action.payload;
    },

    [addContact.pending]:handlePending,
    [addContact.fulfilled](state, action){
        state.contacts.push(action.payload);
        state.isLoading = false;
    },
    [addContact.rejected](state,action){
          state.error = action.payload;  
    },
    [deleteContact.pending]:handlePending,
    [deleteContact.fulfilled](state, action) {
        state.contacts = state.contacts.filter(item => item.id !== action.payload );
        state.isLoading = false;
    },
    [deleteContact.rejected](state, action) {
        state.error = action.payload;
    }

}
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
