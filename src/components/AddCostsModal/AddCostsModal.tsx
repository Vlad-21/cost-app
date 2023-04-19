import React, {useEffect, useState} from "react";
import './AddCostsModal.scss';
import Icon from "../Icon/Icon";
import {addConstOnCategory} from "../../services/transitionService";
import {getCategoryReport} from "../../services/reportService";
import {IReport} from "../../interfaces/report.interface";
import {deleteCategory, updateCategory} from "../../services/categoryService";
import {useNavigate} from "react-router-dom";

interface IModalMode {
    id: number;
    mode: string;
    active: boolean;
}

const colors =  {
    white: '#ffffff',
    black: '#000000'
}

const AddCostsModal: React.FC<{
    handleCloseCostModal: () =>void;
    categoryName: string;
}> = props => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<number>(0);
    const [currentMode, setCurrentMode] = useState<string>('');
    const [currentCategoryName, setCurrentCategoryName] = useState<string>(props.categoryName);
    const [report, setReport] = useState<IReport>();
    const [newName, setNewName] = useState<string>('');
    const [modalMode, setModalMode] = useState<Array<IModalMode>>([
        {
            id: 1,
            mode: "Cost",
            active: true,
        },
        {
            id: 2,
            mode: "Report",
            active: false,
        },
        {
            id: 3,
            mode: "Setting",
            active: false,
        },
    ]);

    useEffect(() => {
        setCurrentCategoryName(currentCategoryName);
        checkMode();
        getReport();
    }, []);

    const checkMode = () => {
        for (const item of modalMode) {
            if (item.active) {
                setCurrentMode(item.mode);
            }
        }
    }

    const getReport = () => {
        getCategoryReport().then((response) => {
            for(const item of response.reportExpenses)  {
                if (item.categoryName === currentCategoryName) {
                    setReport(item)
                }
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleUpdateCategory = () => {
        if (newName) {
            updateCategory(currentCategoryName, newName).then((response) => {
                setCurrentCategoryName(response.categoryName);
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    const handleMode = (clickItem: IModalMode): void => {
        for (const item of modalMode) {
            if (item.mode === clickItem.mode) {
                item.active = true;
                setCurrentMode(item.mode);
            } else {
                item.active = false;
            }
        }
    }

    const handleDeleteCategory = (): void => {
        deleteCategory(currentCategoryName).then((response) => {
            props.handleCloseCostModal();
        }).catch((e) => {
            console.log(e)
        })
    }

    const sendTransition = () => {
        addConstOnCategory(amount, currentCategoryName).then(response => {
        }).catch((e) => {
            console.log(e);
        })
    }
    return (
        <div className="m-add-cost">
            <div className="m-add-cost__container">
                <div className="m-add-cost__container__close-button">
                    <div
                        className="m-add-cost__container__close-button--icon"
                        onClick={props.handleCloseCostModal}>
                        <Icon
                            size="30px"
                            icon="plus-circle"
                            color="#888c9e"
                        />
                    </div>
                </div>
                <div className="m-add-cost__container__controler">
                    <p className="m-add-cost__container__controler--title">{currentCategoryName}</p>
                    <div className="m-add-cost__container__controler__buttons">
                        {modalMode.map((item) => (
                            <button style={{
                                color: item.active ? colors.black : colors.white,
                                background: item.active ? colors.white: colors.black,
                                borderColor: item.active ? colors.black: colors.white,
                            }} onClick={() => handleMode(item)} className="mode-button">{item.mode}</button>
                        ))}
                    </div>
                    {currentMode === 'Cost' && <div className="m-add-cost__container--mode-cost">
                        <p className="m-add-cost__container--mode-cost--title">Додайте витрати в категорію</p>
                        <input
                            type="number"
                            name="amount"
                            step="any"
                            value={amount}
                            onChange={event => setAmount(+event.target.value)}
                            className="m-add-cost__container--mode-cost--input"
                        />
                        <button
                            onClick={sendTransition}
                            className="m-add-cost__container--mode-cost--button"
                        >Додати витрати</button>
                    </div>}
                    {currentMode === 'Report' && <div className="m-add-cost__container--mode-report">
                        <p className="m-add-cost__container--mode-report--title">Ваш звіт</p>
                        <button onClick={getReport} className="m-add-cost__container--mode-report__get-report">Отримати звіт</button>
                        {report ? <div className="m-add-cost__container--mode-report__container">
                            <p className="m-add-cost__container--mode-report__container--name">{report?.categoryName}</p>
                            <p className="m-add-cost__container--mode-report__container--amount">{report?.amount} грн.</p>
                        </div> : <div className="m-add-cost__container--mode-report__container__error">
                            <p className="m-add-cost__container--mode-report__container__error--text">Звітів не знайдено</p>
                        </div>}
                    </div>}
                    {currentMode === 'Setting' && <div className="m-add-cost__container--mode-setting">
                        <p className="m-add-cost__container--mode-setting--title">Налаштування</p>
                        <div className="m-add-cost__container--mode-setting__change-name">
                            <p className="m-add-cost__container--mode-setting__change-name--title">Назва категорії</p>
                            <input
                                className="m-add-cost__container--mode-setting__change-name--input"
                                type="text"
                                name="name"
                                value={newName}
                                onChange={event => setNewName(event.target.value)}
                            />
                            <button
                                className="m-add-cost__container--mode-setting__change-name--button"
                                onClick={() => handleUpdateCategory()}>Змінити назву</button>
                        </div>
                        <div className="m-add-cost__container--mode-setting__delete-category">
                            <p className="m-add-cost__container--mode-setting__delete-category--title">Видалення категорії</p>
                            <button
                                className="m-add-cost__container--mode-setting__delete-category--button"
                                onClick={handleDeleteCategory}>Видалити категорію</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default AddCostsModal