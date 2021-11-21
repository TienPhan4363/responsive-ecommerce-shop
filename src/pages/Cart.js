import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import productData from '../assets/fake-data/products';
import Helmet from '../components/Helmet';
import Button from '../components/Button';
import CartItem from '../components/CartItem';

import numberWithCommas from '../Utils/numberWithCommas';

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const cartItems = useSelector(state => state.cartItems.value);

    const [cartProducts, setCartProducts] = useState(
        productData.getCartItemsInfo(cartItems)
    );

    const [totalProducts, setTotalProducts] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems));
        setTotalPrice(
            cartItems.reduce(
                (total, item) =>
                    total + Number(item.quantity) * Number(item.price),
                0
            )
        );
        setTotalProducts(
            cartItems.reduce((total, item) => total + Number(item.quantity), 0)
        );
    }, [cartItems]);

    return (
        <Helmet title='Giỏ hàng'>
            <div className='cart'>
                <div className='cart__infor'>
                    <div className='cart__infor__text'>
                        <p>
                            Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                        </p>
                        <div className='cart__infor__text__price'>
                            <span>Thành tiền</span>
                            <span>{numberWithCommas(totalPrice)}</span>
                        </div>
                    </div>
                    <div className='cart__infor__btn'>
                        <Button size='sm'>Đặt hàng</Button>
                        <Link to='catalog'>
                            <Button size='sm'>Tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>
                <div className='cart__list'>
                    {cartProducts.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </Helmet>
    );
};

export default Cart;
