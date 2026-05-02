'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { setUserSession } from '@/lib/auth';
import Modal from '@/components/ui/Modal';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

const FormLogin = ({ isAuthOpen, setIsAuthOpen, setUserProfile }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        throw new Error('Username atau password salah');
      }

      setUserSession(data);
      setUserProfile(data);
      setIsAuthOpen(false);
      setUsername('');
      setPassword('');
      alert('✅ Login berhasil!');
    } catch (err) {
      alert('❌ Login gagal: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            username: username,
            password: password,
            nama: nama,
            is_admin: false
          }
        ]);

      if (error) throw error;

      alert('✅ Pendaftaran berhasil! Silakan login.');
      setIsRegister(false);
      setUsername('');
      setPassword('');
      setNama('');
    } catch (err) {
      alert('❌ Pendaftaran gagal: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isAuthOpen}
      title={isRegister ? '✨ Daftar Akun' : '🔐 Login'}
      onClose={() => setIsAuthOpen(false)}
    >
      <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
        {isRegister && (
          <InputField
            id="register-nama"
            label="Nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        )}

        <InputField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Loading...' : isRegister ? '✅ Daftar' : '🔓 Masuk'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => setIsAuthOpen(false)} className="flex-1">
            ❌ Batal
          </Button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-cyan-400 hover:underline"
          >
            {isRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormLogin;
