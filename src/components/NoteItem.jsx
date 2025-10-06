import React from 'react';
import PropTypes from 'prop-types';
import NoteItemContent from './NoteItemContent';

function NoteItem({ id, title, body, createdAt }) {
  return (
    <article className="note-item">
      <NoteItemContent id={id} title={title} body={body} createdAt={createdAt} />
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default NoteItem;