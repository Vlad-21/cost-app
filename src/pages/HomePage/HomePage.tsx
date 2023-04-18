import React from "react";
import './HomePage.scss';
import {blackColor} from "../LoginPage/LoginPageContants";
import Icon from "../../components/Icon/Icon";

const HomePage: React.FC = () => {
    return (
        <div className="p-home">
            <div className="p-home__header">
                <Icon
                    size='50px'
                    icon="coin-wallet-v1"
                />

            </div>
            <div className="p-home__category">

            </div>
        </div>
    );
}

export default HomePage;