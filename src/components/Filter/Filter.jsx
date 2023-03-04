import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from 'redux/filterSlace';
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const changeFilter = event => {
    return dispatch(filterContact(event.target.value));
  };

  return (
    <label>
      <input
        type="text"
        placeholder="Find contacts by name"
        value={filter}
        onChange={changeFilter}
      />
    </label>
  );
};
