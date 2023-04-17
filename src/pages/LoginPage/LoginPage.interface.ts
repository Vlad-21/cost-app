export interface IProps {
    isLogin: boolean;
    changeLogin: (isLogin: boolean) => void;
}

export interface IValidError {
    name: string,
    password: string,
}

export interface ILogin {
    name: string;
    password: string;
}