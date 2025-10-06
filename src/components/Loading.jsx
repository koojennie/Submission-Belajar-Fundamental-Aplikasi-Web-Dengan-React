import React from 'react';

export default function Loading({ label = 'Loading…' }) {
  return (
    <div className="notes-list-empty">
      <p>{label}</p>
    </div>
  );
}