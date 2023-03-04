import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterContact(state, action) {
      return (state = action.payload);
    },
  },
});

export const { filterContact } = contactsSlice.actions;
export const filterReducer = contactsSlice.reducer;
