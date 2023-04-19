import {getToken} from "./userService";

export function addConstOnCategory (amount: number, name: string): Promise<any> {
    return fetch("http://localhost:8080/api/withdraw-money", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
        body: JSON.stringify({
            amount: amount,
            categoryName: name
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}