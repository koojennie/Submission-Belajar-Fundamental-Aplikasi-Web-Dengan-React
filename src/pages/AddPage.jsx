import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import NoteItemAction from '../components/NoteItemAction';
import { addNote } from '../utils/network-data';

export default function AddPage() {
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onAddNote = async ({ title, body }) => {
    setSubmitting(true);
    const { error } = await addNote({ title, body });
    setSubmitting(false);
    if (!error) navigate('/');
  };

  const submit = () => {
    if (formRef.current) {
      const evt = new Event('submit', { bubbles: true, cancelable: true });
      formRef.current.dispatchEvent(evt);
    }
  };

  return (
    <>
      <section className="add-new-page">
        <NoteInput addNote={onAddNote} refCallback={(el) => (formRef.current = el)} />
      </section>

      <div className="add-new-page__action">
        <NoteItemAction title={submitting ? 'Simpan' : 'Simpan'} onClick={submit} />
      </div>
    </>
  );
}