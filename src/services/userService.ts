export function setUser(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function isAuth(): boolean {
    return !!localStorage.getItem('userData');
}

export function logout(): void {
    localStorage.clear();
}

export async function createUser (email: string, password: string): Promise<void> {
    try {
        const response = await fetch("http://localhost:8080/api/create-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        console.log("Response =>", response);
    } catch (e) {
        console.log('error =>', e);
    }
}

export async function loginUser (email: string, password: string): Promise<void> {
    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        console.log("Response =>", response);
    } catch (e) {
        console.log('error =>', e);
    }
}

