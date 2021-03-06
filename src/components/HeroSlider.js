import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from './Button';

const HeroSlider = props => {
    const data = props.data;

    const timeOut = props.timeOut ? props.timeOut : 3000;

    const [activeSlide, setActiveSlide] = useState(0);

    const netxSlide = useCallback(() => {
        const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
        setActiveSlide(index);
    }, [activeSlide, data]);

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
        setActiveSlide(index);
    };

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                netxSlide();
            }, timeOut);
            return () => clearInterval(slideAuto);
        }
    }, [netxSlide, timeOut, props]);

    return (
        <div className='hero-slider'>
            {data.map((item, index) => (
                <HeroSliderItem
                    key={index}
                    item={item}
                    active={index === activeSlide}
                />
            ))}
            {props.control ? (
                <div className='hero-slider__control'>
                    <div className='hero-slider__control__item'>
                        <i
                            className='bx bx-chevron-left'
                            onClick={prevSlide}
                        ></i>
                    </div>
                    <div className='hero-slider__control__item'>
                        <div className='index'>
                            {activeSlide + 1}/{data.length}
                        </div>
                    </div>
                    <div
                        className='hero-slider__control__item'
                        onClick={netxSlide}
                    >
                        <i className='bx bx-chevron-right'></i>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
};

const HeroSliderItem = props => (
    <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
        <div className='hero-slider__item__infor'>
            <div
                className={`hero-slider__item__infor__title color-${props.item.color}`}
            >
                <span>{props.item.title}</span>
            </div>

            <div className='hero-slider__item__infor__description'>
                <span>{props.item.description}</span>
            </div>

            <div className='hero-slider__item__infor__btn'>
                <Link to={props.item.path}>
                    <Button
                        size='sm'
                        backgroundColor={props.item.color}
                        icon='bx bx-cart'
                        animate={true}
                    >
                        Xem chi ti???t
                    </Button>
                </Link>
            </div>
        </div>
        <div className='hero-slider__item__img'>
            <div className={`shape bg-${props.item.color}`}></div>
            <img src={props.item.img} alt='' />
        </div>
    </div>
);

export default HeroSlider;
