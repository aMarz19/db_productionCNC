export function getUserSession() {
    if (typeof window === 'undefined') return null;
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
}

export function setUserSession(data) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('userSession', JSON.stringify(data));
}

export function clearUserSession() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('userSession');
}