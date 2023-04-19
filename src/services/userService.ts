import {IUser} from "../interfaces/user.interface";
import {useNavigate} from "react-router-dom";

export function setUser(userData: IUser): void {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function getToken(): string | null {
    return localStorage.getItem('token');
};

export function getCurrentUser() {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem("userData"));
    return user;
}

export function isAuth(): boolean {
    return !!localStorage.getItem('userData');
}

export function logoutUser(): void {
    localStorage.clear();
}

export function createUser (email: string, password: string): Promise<IUser> {
    return fetch("http://localhost:8080/api/create-user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function loginUser (email: string, password: string): Promise<IUser> {
    return fetch("http://localhost:8080/api/login", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Basic ${btoa(`${email}:${password}`)}`
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        localStorage.setItem('token',`Basic ${btoa(`${email}:${password}`)}`)
        return response.json();
    });
}

export function getUserInfo (): Promise<IUser> {
    return fetch("http://localhost:8080/api/login", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function addUserBalance (amount: number): Promise<IUser> {
    return fetch("http://localhost:8080/api/deposit-money", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
        body: JSON.stringify({
            amount: amount
        })
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function deleteUser (): Promise<void> {
    return fetch("http://localhost:8080/api/delete-user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

