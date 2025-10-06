import React from 'react';

const LocaleContext = React.createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(localStorage.getItem('locale') || 'id');

  const toggleLocale = React.useCallback(() => {
    setLocale((prev) => (prev === 'id' ? 'en' : 'id'));
  }, []);

  React.useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const value = React.useMemo(() => ({ locale, toggleLocale }), [locale, toggleLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export default LocaleContext;