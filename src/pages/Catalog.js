import React, { useState, useCallback, useEffect, useRef } from 'react';

import Helmet from '../components/Helmet';
import CheckBox from '../components/CheckBox';
import Button from '../components/Button';
import InfinityList from '../components/InfinityList';

import productData from '../assets/fake-data/products';
import category from '../assets/fake-data/category';
import colors from '../assets/fake-data/product-color';
import size from '../assets/fake-data/product-size';

const Catalog = () => {
    const initFilter = {
        category: [],
        color: [],
        size: []
    };

    const productList = productData.getAllProducts();

    const [products, setProducts] = useState(productList);

    const [filter, setFilter] = useState(initFilter);

    const updateProducts = useCallback(() => {
        let temp = productList;

        if (filter.category.length > 0) {
            temp = temp.filter(e => filter.category.includes(e.categorySlug));
        }

        if (filter.color.length > 0) {
            temp = temp.filter(e => {
                const check = e.colors.find(color => filter.color.includes(color));
                return check !== undefined;
            });
        }

        if (filter.size.length > 0) {
            temp = temp.filter(e => {
                const check = e.size.find(size => filter.size.includes(size));
                return check !== undefined;
            });
        }

        setProducts(temp);
    }, [filter, productList]);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;

                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;

                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY': {
                    const newCategory = filter.category.filter(e => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                }

                case 'COLOR': {
                    const newColor = filter.color.filter(e => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                }

                case 'SIZE': {
                    const newSize = filter.size.filter(e => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                }
                default:
            }
        }
    };

    const clearFilter = () => {
        setFilter(initFilter);
    };

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    const filterRef = useRef(null);

    const showHiddenFilter = () => filterRef.current.classList.toggle('active');

    return (
        <Helmet title="Sản phẩm">
            {/* {console.log(filter)} */}
            <div className="catalog">
                {/* Catalog filter */}
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={showHiddenFilter}>
                        <i className="bx bx-left-arrow-alt" />
                    </div>
                    {/* Catalog by products */}
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">danh mục sản phẩm</div>
                        <div className="catalog__filter__widget__content">
                            {category.map((item, index) => (
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={input =>
                                            filterSelect('CATEGORY', input.checked, item)
                                        }
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Catalog by colors */}
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">màu sắc</div>
                        <div className="catalog__filter__widget__content">
                            {colors.map((item, index) => (
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={input =>
                                            filterSelect('COLOR', input.checked, item)
                                        }
                                        checked={filter.color.includes(item.color)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Catalog by size */}
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">kích cỡ</div>
                        <div className="catalog__filter__widget__content">
                            {size.map((item, index) => (
                                <div className="catalog__filter__widget__content__item" key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={input =>
                                            filterSelect('SIZE', input.checked, item)
                                        }
                                        checked={filter.size.includes(item.size)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Catalog button */}
                    <div className="catalog__filter__widget">
                        <Button
                            className="catalog__filter__widget__btn"
                            size="sm"
                            onClick={clearFilter}
                        >
                            xóa bộ lọc
                        </Button>
                    </div>
                </div>

                {/* Catalof filter toggle */}
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHiddenFilter()}>
                        bộ lọc
                    </Button>
                </div>

                {/* Catalog content */}
                <div className="catalog__content">
                    <InfinityList data={products} />
                </div>
            </div>
        </Helmet>
    );
};

export default Catalog;
