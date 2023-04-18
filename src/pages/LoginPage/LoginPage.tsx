import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ILogin, IProps, IValidError} from "./LoginPage.interface";
import {loginUser, setUser} from "../../services/userService";
import Icon from "../../components/Icon/Icon";
import {blackColor, errorColor} from './LoginPageContants';
import './LoginPage.scss';

const LoginPage: React.FC<IProps> = ({isLogin, changeLogin}) => {
    const [formData, setFormData] = useState<ILogin>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<IValidError>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigation = useNavigate();
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
    useEffect(() => {
        if (isLogin) {
            navigation('/');
        }
    })

    const handleRegistrationClick = () => {
        navigation('/registration');
    }

    const validationForm = (form: ILogin): IValidError => {
        const errors: IValidError = {
            email: '',
            password: '',
        }
        if (!form.email) {
            errors.email = 'Email is required';
        }
        if (!form.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }
    const handleSubmitClick = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        const error = validationForm(formData);
        if (error.email || error.password) {
            setErrors(error);
        } else {
            loginUser(formData.email, formData.password);
            // changeLogin(true);
        };
    }
    return (
        <div className="p-login">
            <div className="p-login__container">
                <h1 className="p-login__container--title">Увійти</h1>
                <form className="p-login__container__form" onSubmit={handleSubmitClick}>
                    <label style={{color: errors.email ? errorColor : blackColor}} className="p-login__container__form--label">Пошта</label>
                    <div
                        style={{borderColor: errors.email ? errorColor : blackColor}}
                        className="p-login__container__form__wrap">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            className="p-login__container__form__wrap--input"
                        />
                        {errors.email && <Icon size='20px' icon='alert-triangle' color={errorColor} />}
                    </div>
                    <label
                        style={{color: errors.password ? errorColor : blackColor}}
                        className="p-login__container__form--label">Пароль</label>
                    <div
                        style={{borderColor: errors.password ? errorColor : blackColor}}
                        className="p-login__container__form__wrap">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            className="p-login__container__form__wrap--input"
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                            <Icon
                                className="icon-password-show"
                                size='20px' icon={showPassword ? 'eye' : 'eye-off'} color={blackColor} />
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="p-login__container__form--submit"
                        value="Увійти"
                    />
                    <p onClick={handleRegistrationClick} className="p-login__container__form--registration">Зареєструватися</p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;