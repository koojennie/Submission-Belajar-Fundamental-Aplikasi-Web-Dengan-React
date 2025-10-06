import React from 'react';
import PropTypes from 'prop-types';
import { FaBoxArchive, FaCheck, FaPlus, FaTrash, FaXmark } from 'react-icons/fa6';

function NoteItemAction({ title, onClick, ariaLabel }) {
  return (
    <button className="action" type="button" title={title} aria-label={ariaLabel || title} onClick={onClick}>
      {title === 'Tambah' && (
        <FaPlus />
      )}
      {title === 'Arsipkan' && (
        <FaBoxArchive />
      )}
      {title === 'Batal Arsip' && (
        <FaXmark />
      )}
      {title === 'Hapus' && (
        <FaTrash />
      )}
      {title === 'Simpan' && (
        <FaCheck />
      )}
    </button>
  );
}

NoteItemAction.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string
};

export default NoteItemAction;