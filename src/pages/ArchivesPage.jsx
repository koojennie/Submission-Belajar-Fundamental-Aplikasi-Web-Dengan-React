import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { getArchivedNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

export default function ArchivesPage() {
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('title') || '';
  const { locale } = React.useContext(LocaleContext)

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data } = await getArchivedNotes();
      if (mounted && data) setNotes(data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const onSearch = (value) => {
    if (value) setSearchParams({ title: value });
    else setSearchParams({});
  };

  const filtered = notes.filter((n) =>
    keyword ? n.title.toLowerCase().includes(keyword.toLowerCase()) : true
  );

  return (
    <section className="archives-page">
      <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Note'}</h2>
      <SearchBar search={onSearch} defaultKeyword={keyword} />
      {loading ? <Loading /> : <NoteList notes={filtered} emptyText={locale === 'id' ? 'Tidak ada catatan' : 'No Notes'} />}
    </section>
  );
}