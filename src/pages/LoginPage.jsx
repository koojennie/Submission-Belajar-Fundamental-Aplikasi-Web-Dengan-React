import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login, putAccessToken, getUserLogged } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

export default function LoginPage({ onLoginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = React.useState(false);
  const { locale } = React.useContext(LocaleContext)
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error, data } = await login({ email, password });
    setLoading(false);
    if (!error) {
      putAccessToken(data.accessToken);
      const { data: user } = await getUserLogged(); 
      onLoginSuccess?.(user); 
      navigate('/', { replace: true });
    }
  }

  return (
    <section className="login-page">
      <h2><Link to="/">{locale === 'id' ? 'Login untuk menggunakan aplikasi' : 'Login to use this app'}</Link></h2>
      <form onSubmit={onSubmit} className="input-login">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={onEmailChange} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={onPasswordChange} />
        <button disabled={loading}>{loading ? 'Loading…' : 'Login'}</button>
      </form>
      <p>{locale === 'id' ? 'Belum punya akun?' : `Didn't have an account?`} <Link to="/register">{locale === 'id' ? 'Daftar disini' : 'Register Here'}</Link></p>
    </section>
  );
}

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func,
};