import PropTypes from 'prop-types';

import { Item } from './Contact.styled';

export default function Contact({ name, id, number, handleDeleteBTN }) {
  return (
    <Item key={id}>
      <div>
        <p>{name}</p>
        <p>{number}</p>
      </div>
      <button
        className="delete-btn"
        type="button"
        onClick={() => {
          handleDeleteBTN(id);
        }}
      >
        Delete
      </button>
    </Item>
  );
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDeleteBTN: PropTypes.func.isRequired,
};
