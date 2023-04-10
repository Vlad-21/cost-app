import React, {ReactElement} from "react";
import {Navigate} from "react-router-dom";
import {IPrivateProps} from "./PrivateRouteComponent.interface";

const ProtectedRoute:React.FC<IPrivateProps> = ({ isLogin, children }): ReactElement => {
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;