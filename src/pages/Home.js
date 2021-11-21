import React from 'react';
import { Link } from 'react-router-dom';

import Helmet from '../components/Helmet';
import HeroSlider from '../components/HeroSlider';
import Section, { SectionTitle, SectionBody } from '../components/Section';
import PolicyCard from '../components/PolicyCard';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';

import heroSliderData from '../assets/fake-data/hero-slider';
import policy from '../assets/fake-data/policy';
import productData from '../assets/fake-data/products';
import banner from '../assets/images/banner.png';

const Home = () => {
    return (
        <Helmet title='Trang chủ'>
            {/* Hero slider */}
            <HeroSlider
                data={heroSliderData}
                control={true}
                auto={true}
                timeOut={5000}
            />
            {/* end Hero slider */}

            {/* Policy section */}
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {policy.map((item, index) => (
                            <Link key={index} to='/policy'>
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            {/* end Policy section */}

            {/* Best selling section */}
            <Section>
                <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(4).map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                title={item.title}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            {/* end Best selling section */}

            {/* New arrival section */}
            <Section>
                <SectionTitle>sản phẩm mới</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(8).map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                title={item.title}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            {/* end New arrival section */}

            {/* Banner */}
            <Section>
                <SectionBody>
                    <Link to='/catalog'>
                        <img src={banner} alt='banner' />
                    </Link>
                </SectionBody>
            </Section>
            {/* endBanner */}

            {/* Popular section */}
            <Section>
                <SectionTitle>sản phẩm phổ biến</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(8).map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                title={item.title}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            {/* end Popular section */}
        </Helmet>
    );
};

export default Home;
