import React from "react";
import {IRegistrationInputProps} from "./RegistrationInputComponent.interface";
import './RegistrationInputComponent.scss';
import Icon from "../Icon/Icon";

const RegistrationInputComponent: React.FC<IRegistrationInputProps> = props => {
    const errorColor:string = "#ff4c22";
    const blackColor: string = '#888c9e';
    return (
        <div className="c-registration-input">
            <label style={{color: props.errorMessage ? errorColor : blackColor}} className="c-registration-input--title">{props.label}</label>
            <div
                style={{borderBottomColor: props.errorMessage ? errorColor : blackColor }}
                className="c-registration-input__wrap">
                <input
                    className="c-registration-input__wrap--input"
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onChange={(event) => props.onChange(event)}
                />
                { props.errorMessage && <Icon size='20px' icon='alert-triangle' color={errorColor} /> }
            </div>
        </div>
    )
}

export default RegistrationInputComponent;