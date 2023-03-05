import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'services/api';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleInput = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;

      case 'number':
        setNumber(event.target.value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const addNewContact = ({ name, number }) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts!`);
    }
    return dispatch(addContact(newContact));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addNewContact({ name, number });
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactForm}>
      <label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInput}
        />
      </label>

      <label>
        <input
          type="tel"
          name="number"
          placeholder="Number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInput}
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};
