
export interface IProps {
    isLogin: boolean;
}
export interface IFormValue {
    name: string;
    email: string;
    password: string;
}

export interface IFormError {
    name: boolean;
    email: boolean;
    password: boolean;
}