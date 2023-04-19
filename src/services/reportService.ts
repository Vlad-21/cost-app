import {getToken} from "./userService";
import {IListReports} from "../interfaces/report.interface";

export function getCategoryReport (): Promise<IListReports> {
    return fetch("http://localhost:8080/api/report-expenses", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `${getToken()}`
        },
        body: JSON.stringify({
            startDate: '2023-01-01',
            endDate: '2023-12-31'
        })
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}