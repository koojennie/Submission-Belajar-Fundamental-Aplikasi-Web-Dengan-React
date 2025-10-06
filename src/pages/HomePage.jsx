import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { getActiveNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

export default function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('title') || '';
  const { locale } = React.useContext(LocaleContext)

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data } = await getActiveNotes();
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
    <section className="homepage">
      <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
      <SearchBar search={onSearch} defaultKeyword={keyword} />
      {loading ? <Loading /> : <NoteList notes={filtered} emptyText="Tidak ada catatan" />}

      <div className="homepage__action">
        <Link className="action" to="/notes/new" title="Tambah" aria-label="Tambah">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}