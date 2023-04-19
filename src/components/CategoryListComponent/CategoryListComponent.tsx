import React from "react";
import './CategoryListComponent.scss';
import {ICategory} from "../../interfaces/category.interface";
import Icon from "../Icon/Icon";

const CategoryListComponent: React.FC<{
    categories: Array<ICategory>;
    handleNewCategory: () => void;
    handleAddCostsClick: (name: string) => void;
}> = props => {
    return (
        <div className="c-category-list">
            <div className="button-container">
                <div
                    className="c-category-list__button"
                    onClick={props.handleNewCategory}>
                    <p className="c-category-list__button--title">Створити категорію</p>
                    <Icon
                        size="18px"
                        icon="plus-circle"
                        color="#ffffff"
                    />
                </div>
            </div>
            <div className="category-container">
                {!!props.categories.length && props.categories.map((item) => (
                    <div onClick={() => props.handleAddCostsClick(item.categoryName)} className="c-category-list__container">
                        <p className="c-category-list__container--title">{item?.categoryName}</p>
                    </div>
                ))}
                {!props.categories.length && <div className="c-category-list__no-category">
                    <p className="c-category-list__no-category--title">Категорії відсутні</p>
                </div>}
            </div>
        </div>
    );
}

export default CategoryListComponent;