export function setUser(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function isAuth(): boolean {
    return !!localStorage.getItem('userData');
}

export function logout(): void {
    localStorage.clear();
}