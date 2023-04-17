import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ILogin, IProps, IValidError} from "./LoginPage.interface";
import {setUser} from "../../services/userService";
import Icon from "../../components/Icon/Icon";
import {blackColor, errorColor} from './LoginPageContants';
import './LoginPage.scss';

const LoginPage: React.FC<IProps> = ({isLogin, changeLogin}) => {
    const [formData, setFormData] = useState<ILogin>({
        name: '',
        password: '',
    });
    const [errors, setErrors] = useState<IValidError>({
        name: '',
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
            name: '',
            password: '',
        }
        if (!form.name) {
            errors.name = 'Name is required';
        }
        if (!form.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }
    const handleSubmitClick = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        const error = validationForm(formData);
        if (error.name || error.password) {
            setErrors(error);
        } else {
            setUser(formData);
            changeLogin(true);
        };
    }
    return (
        <div className="p-login">
            <div className="p-login__container">
                <h1 className="p-login__container--title">Увійти</h1>
                <form className="p-login__container__form" onSubmit={handleSubmitClick}>
                    {/*<Icon size='20px' icon='eye-off' />*/}
                    <label style={{color: errors.name ? errorColor : blackColor}} className="p-login__container__form--label">User Name:</label>
                    <div
                        style={{borderColor: errors.name ? errorColor : blackColor}}
                        className="p-login__container__form__wrap">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            className="p-login__container__form__wrap--input"
                        />
                        {errors.name && <Icon size='20px' icon='alert-triangle' color={errorColor} />}
                    </div>
                    <label
                        style={{color: errors.password ? errorColor : blackColor}}
                        className="p-login__container__form--label">Password:</label>
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