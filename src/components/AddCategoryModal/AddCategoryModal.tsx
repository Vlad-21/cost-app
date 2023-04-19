import React, {useState} from "react";
import './AddCategoryModal.scss';
import Icon from "../Icon/Icon";
import {createCategory} from "../../services/categoryService";

const AddCategoryModal: React.FC<{
    handleClick: () => void;
    updateCategory: () => void;
}> = props => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const handleCloseButtonClick = (): void => {
       props.handleClick();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setCategoryName(event.target.value)
    }

    const handleAddCategoryButtonClick = ():void => {
        if (!categoryName.length) {
            setError('Поле не може бути пуcтим!');
        } else {
            createCategory(categoryName).then(() => {
                props.updateCategory();
                handleCloseButtonClick();
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    return (
        <div className="m-wrap">
            <div className="m-wrap__container">
                <div className="m-wrap__container__close-button">
                    <div
                        className="m-wrap__container__close-button--icon"
                        onClick={handleCloseButtonClick}>
                        <Icon
                            size="30px"
                            icon="plus-circle"
                            color="#888c9e"
                        />
                    </div>
                </div>
                <div className="m-wrap__container__category--info">
                    <p className="m-wrap__container__category--info--title">Назва категорії</p>
                    <input
                        type="text"
                        name="name"
                        value={categoryName}
                        onChange={handleInputChange}
                        className="m-wrap__container__category--info--input"
                    />
                    {error && <p className="m-wrap__container__category--info--error">{error}</p>}
                    <button
                        onClick={handleAddCategoryButtonClick}
                        className="m-wrap__container__category--info--button"
                    >Додати нову категорію</button>
                </div>
            </div>
        </div>
    );
}

export default AddCategoryModal;
