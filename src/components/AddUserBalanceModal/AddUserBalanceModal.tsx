import React, {useState} from "react";
import './AddUserBalanceModal.scss';
import Icon from "../Icon/Icon";

const AddUserBalanceModal: React.FC<{
    handleCloseClick: () => void;
    handleAddBalanceClick: (amount: number) => void;
}> = props => {
    const [balance, setBalance] = useState<number>(0);
    const handleCloseAddBalanceClick = () => {
        props.handleCloseClick();
    }

    const handleSubmit = (): void => {
        props.handleAddBalanceClick(balance);
    }

    return (
        <div className="m-add-balance">
            <div className="m-add-balance__container">
                <div className="m-add-balance__container__close-button">
                    <div
                        className="m-add-balance__container__close-button--icon"
                        onClick={handleCloseAddBalanceClick}>
                        <Icon
                            size="30px"
                            icon="plus-circle"
                            color="#888c9e"
                        />
                    </div>
                </div>
                <div className="m-add-balance__container__category--info">
                    <p className="m-add-balance__container__category--info--title">Введіть суму:</p>
                    <input
                        type="number"
                        name="amount"
                        step="any"
                        value={balance}
                        onChange={event => setBalance(+event.target.value)}
                        className="m-add-balance__container__category--info--input"
                    />
                    <button
                        onClick={handleSubmit}
                        className="m-add-balance__container__category--info--button"
                    >Додати прихід</button>
                </div>
            </div>
        </div>
    );
}

export default AddUserBalanceModal;