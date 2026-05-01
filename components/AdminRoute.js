'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/lib/auth';

const AdminRoute = ({ children }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const session = getUserSession();
        if (!session) {
            router.push('/');
        } else if (!session.is_admin) {
            alert('❌ Akses ditolak! Anda bukan admin.');
            router.push('/');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default AdminRoute;