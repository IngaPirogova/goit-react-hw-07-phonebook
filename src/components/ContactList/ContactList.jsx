import css from './ContactList.module.css';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const searchContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ul className={css.contactList}>
        {searchContacts.map(({ name, number, id }) => {
          return (
            <ContactItem key={nanoid()} name={name} number={number} id={id} />
          );
        })}
      </ul>
    </>
  );
};
