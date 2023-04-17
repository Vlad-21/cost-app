import React, {useState} from "react";
import './RegistrationPage.scss';
import RegistrationInputComponent from "../../components/RegistrationInputComponent/RegistrationInputComponent";
import {ILogin, IValidError} from "../LoginPage/LoginPage.interface";
import {setUser} from "../../services/userService";
import Icon from "../../components/Icon/Icon";
import {useNavigate} from "react-router-dom";

interface IFormValue {
    name: string;
    email: string;
    password: string;
}

interface IFormError {
    name: boolean;
    email: boolean;
    password: boolean;
}

const RegistrationPage: React.FC = () => {
    const errorColor:string = "#ff4c22";
    const blackColor: string = '#888c9e';
    const navigation = useNavigate();
    const [formData, setFormData] = useState<IFormValue>({
        name: '',
        email: '',
        password: '',
    });

    const [formError, setFormError] = useState<IFormError>({
        name: false,
        email: false,
        password: false
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validationForm = (form: IFormValue): IFormError  => {
        const errors: IFormError = {
            name: !form.name,
            email: !form.email,
            password: !form.password,
        };
        return errors;
    }
    const handleFormSubmitClick = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        const error: IFormError = validationForm(formData);
        if (error.name || error.password || error.email) {
            setFormError(error);
        } else {
            setUser(formData);
        };

    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleLoginClick = () => {
        navigation('/login');
    }

    return (
        <div className="p-registration">
            <div className="p-registration__container">
                <h1 className="p-registration__container--title">Реєстрація</h1>
                <form className="p-registration__container__form" onSubmit={handleFormSubmitClick}>
                    <div className="p-registration__container__form__user-info">
                        <RegistrationInputComponent
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            label="Імʼя"
                            errorMessage={formError.name}
                        />
                        <RegistrationInputComponent
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            label="Пошта"
                            errorMessage={formError.email}
                        />
                    </div>
                    <div className="p-registration__container__form__password">
                        <label
                            style={{color: formError.password ? errorColor : blackColor}}
                            className="p-registration__container__form__password--title">Пароль</label>
                        <div
                            style={{borderBottomColor: formError.password ? errorColor : blackColor}}
                            className="p-registration__container__form__password__wrap">
                            <input
                                className="p-registration__container__form__password__wrap--input"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleOnChange}
                            />
                            <div className="p-registration__container__form__password__wrap--icon" onClick={() => setShowPassword(!showPassword)}>
                                <Icon size='20px' icon={showPassword ? 'eye' : 'eye-off'} />
                            </div>
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Зареєструватися"
                        className="p-registration__container__form--submit"
                    />
                    <p onClick={handleLoginClick} className="p-registration__container__form--go-to-login">Увійти</p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;