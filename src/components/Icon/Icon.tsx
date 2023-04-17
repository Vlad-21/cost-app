import React from "react";
import iconSet from "../../assets/icon/selection.json";
import IcomoonReact from "icomoon-react";
import { IIconProps } from './Icon.interface';

const Icon: React.FC<IIconProps> = props => {
    const { color, size = "100%", icon, className = "" } = props;
    return (
        <IcomoonReact
            className={className}
            iconSet={iconSet}
            color={color}
            size={size}
            icon={icon}
        />
    );
};

export default Icon;