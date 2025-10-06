import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

export default function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirm, onConfirmChange] = useInput('');
  const [loading, setLoading] = React.useState(false);
  const { locale } = React.useContext(LocaleContext)
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      alert('Konfirmasi password tidak cocok.');
      return;
    }
    setLoading(true);
    const { error } = await register({ name, email, password });
    setLoading(false);
    if (!error) {
      alert('Registrasi berhasil. Silakan login.');
      navigate('/login', { replace: true });
    }
  }

  return (
    <section className="register-page">
      <h2>{locale === 'id' ? 'Isi form untuk mendaftarkan akun' : 'Fill the form to register'}</h2>
      <form onSubmit={onSubmit} className="input-register">
        <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
        <input id="name" value={name} onChange={onNameChange} />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={onEmailChange} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={onPasswordChange} />
        <label htmlFor="confirm">{locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
        <input id="confirm" type="password" value={confirm} onChange={onConfirmChange} />
        <button disabled={loading}>
          {loading 
            ? 'Loading…' 
            : locale === 'id' 
              ? 'Registrasi' 
              : 'Register'}
        </button>
      </form>
      <p>{locale === 'id' ? 'Sudah punya akun?' : `Already have an account?`} <Link to="/login">{locale === 'id' ? 'Login disini' : 'Login here'}</Link></p>
    </section>
  );
}