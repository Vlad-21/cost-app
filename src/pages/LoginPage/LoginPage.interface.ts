export interface IProps {
    isLogin: boolean;
    changeLogin: (isLogin: boolean) => void;
}

export interface IValidError {
    email: string,
    password: string,
}

export interface ILogin {
    email: string;
    password: string;
}