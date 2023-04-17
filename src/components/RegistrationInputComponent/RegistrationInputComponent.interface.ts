import React from "react";

export interface IRegistrationInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    label: string;
    errorMessage: boolean;
}