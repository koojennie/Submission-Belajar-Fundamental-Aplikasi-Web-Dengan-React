import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import NoteItemAction from '../components/NoteItemAction';
import Loading from '../components/Loading';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data } = await getNote(id);
      if (mounted) setNote(data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <Loading />;

  if (!note) {
    return (
      <section className="detail-page">
        <h3 className="detail-page__title">Catatan tidak ditemukan</h3>
      </section>
    );
  }

  const onDelete = async () => {
    await deleteNote(note.id);
    navigate(note.archived ? '/archives' : '/', { replace: true });
  };

  const onArchiveToggle = async () => {
    if (note.archived) {
      await unarchiveNote(note.id);
      navigate('/', { replace: true });
    } else {
      await archiveNote(note.id);
      navigate('/archives', { replace: true });
    }
  };

  return (
    <>
      <NoteDetail {...note} />
      <div className="detail-page__action">
        <NoteItemAction
          title={note.archived ? 'Batal Arsip' : 'Arsipkan'}
          ariaLabel={note.archived ? 'Batal Arsip' : 'Arsipkan'}
          onClick={onArchiveToggle}
        />
        <NoteItemAction title="Hapus" onClick={onDelete} />
      </div>
    </>
  );
}