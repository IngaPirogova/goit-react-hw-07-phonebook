import { useDispatch } from 'react-redux';
import css from './ContactItem.module.css';
import { deleteContact } from 'services/api';

export const ContactItem = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const deleteContactId = () => dispatch(deleteContact(id));
  return (
    <>
      <li key={id} className={css.contactItem}>
        <p>
          {name}: {number}
        </p>
        <button
          type="button"
          className={css.bthListItem}
          onClick={deleteContactId}
        >
          Delete
        </button>
      </li>
    </>
  );
};
