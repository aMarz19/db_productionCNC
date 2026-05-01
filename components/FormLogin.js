'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { setUserSession } from '@/lib/auth';

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

    if (!isAuthOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
                <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">
                        {isRegister ? '✨ Daftar Akun' : '🔐 Login'}
                    </h3>
                </div>

                <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4 p-6">
                    {isRegister && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">Nama</label>
                            <input
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Loading...' : isRegister ? '✅ Daftar' : '🔓 Masuk'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAuthOpen(false)}
                            className="flex-1 rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-600"
                        >
                            ❌ Batal
                        </button>
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
            </div>
        </div>
    );
};

export default FormLogin;