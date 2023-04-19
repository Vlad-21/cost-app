import React, {useEffect, useState} from "react";
import './HomePage.scss';
import Icon from "../../components/Icon/Icon";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import CategoryListComponent from "../../components/CategoryListComponent/CategoryListComponent";
import {addUserBalance, deleteUser, getUserInfo, logoutUser} from "../../services/userService";
import {IUser} from "../../interfaces/user.interface";
import AddUserBalanceModal from "../../components/AddUserBalanceModal/AddUserBalanceModal";
import {getCategories} from "../../services/categoryService";
import {ICategory} from "../../interfaces/category.interface";
import {useNavigate} from "react-router-dom";
import AddCostsModal from "../../components/AddCostsModal/AddCostsModal";

const HomePage: React.FC<{
    changeLogin: (login: boolean) => void
}> = props => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAddBalance, setShowAddBalance] = useState<boolean>(false);
    const [showAddCostModal, setShowAddCostModal] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>('');
    const [user, setUser] = useState<IUser>();
    const [category, setCategory] = useState<Array<ICategory>>([])
    const [controller, setController] = useState([
        {name: 'log-out', color: '#000'},
        {name: 'trash-2', color: '#ff4c22'}
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        userUpdate();
        updateCategory();
    }, [])

    const handleCloseAddBalance = (): void => {
        setShowAddBalance(false);
    }

    const handleAddBalanceModalClick = ():void => {
        setShowAddBalance(true)
    }

    const handleAddUserBalanceClick = (amount: number): void => {
        addUserBalance(amount).then((response) => {
            setShowAddBalance(false);
            userUpdate();
        }).catch((e) => {
            console.log(e)
        });
    }

    const updateCategory = () => {
            getCategories().then((response) => {
                setCategory(response);
            });
    }
    const userUpdate = ():void => {
        getUserInfo().then((response) => {
            setUser(response);
        });
    }
    const handleAddCategoryClick = ():void => {
        setShowModal(true);
    }

    const handleCloseModalClick = ():void => {
        setShowModal(false);
    }

    const handleCreateCategory = (): void => {
        updateCategory();
    }

    const handleDeleteUser = () => {
        deleteUser().then(() => {
        }).catch(e => {
            console.log(e)
        })
    }

    const handleControlsClick = (type: string):void => {
        switch (type) {
            case 'log-out':
                logoutUser();
                props.changeLogin(false);
                navigate('/login');
                break;
            case 'trash-2':
                handleDeleteUser();
                logoutUser();
                props.changeLogin(false);
                break;
        }
    }

    const handleAddCostsClick = (name: string):void => {
        setCategoryName(name);
        setShowAddCostModal(true);
    }

    const handleCloseCostModal = (): void => {
        setShowAddCostModal(false);
        updateCategory();
        userUpdate();
    }

    return (
        <div className="p-home">
            <div className="p-home__header">
                <div className="p-home__header--logo-container">
                    <Icon
                        size='50px'
                        icon="coin-wallet-v1"
                    />
                </div>
                <div className="p-home__header__user-balanсe">
                    <div
                        onClick={handleAddBalanceModalClick}
                        className="p-home__header__user-balanсe--add-balance">
                        <Icon size="20px" icon="plus" />
                    </div>
                    <p className="p-home__header__user-balanсe--balanсe">Ваш баланс: {user?.balance} грн.</p>
                </div>
                <div className="p-home__header__controler">
                    {controller.map((item) => (
                        <div onClick={() => handleControlsClick(item.name)} className="p-home__header__controler--button">
                            <Icon size="20px" icon={item.name} color={item.color}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-home__category">
                <CategoryListComponent
                    categories={category}
                    handleNewCategory={handleAddCategoryClick}
                    handleAddCostsClick={handleAddCostsClick}
                />
            </div>
            {showAddBalance && <AddUserBalanceModal handleCloseClick={handleCloseAddBalance} handleAddBalanceClick={handleAddUserBalanceClick}/>}
            {showModal && <AddCategoryModal handleClick={handleCloseModalClick} updateCategory={handleCreateCategory} />}
            {showAddCostModal && <AddCostsModal handleCloseCostModal={handleCloseCostModal} categoryName={categoryName}/>}
        </div>
    );
}

export default HomePage;