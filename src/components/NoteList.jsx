import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ notes, emptyText }) {
  if (!notes.length) {
    return (
      <section className="notes-list-empty">
        <img className="notes-list-empty-image" src="/tidak-ada-catatan.svg"/>
        <p>{emptyText || 'Tidak ada catatan'}</p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyText: PropTypes.string
};

export default NoteList;