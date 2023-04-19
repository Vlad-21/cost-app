import {getCurrentUser, getToken} from "./userService";
import {IUser} from "../interfaces/user.interface";
import exp from "constants";
import {ICategory} from "../interfaces/category.interface";

export function getCategories(): Promise<any> {
    return fetch('http://localhost:8080/api/categories-all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function createCategory(name: string): Promise<ICategory> {
    return fetch('http://localhost:8080/api/create-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
        body: JSON.stringify({
            name: name
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function updateCategory(name: string, newName: string): Promise<ICategory> {
    return fetch('http://localhost:8080/api/update-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
        body: JSON.stringify({
            name: name,
            newName: newName
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export function deleteCategory(name:string): Promise<void> {
    return fetch('http://localhost:8080/api/delete-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
        body: JSON.stringify({
            name: name
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}