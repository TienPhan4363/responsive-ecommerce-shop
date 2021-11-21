import React from 'react';

const Section = props => {
    //prettier-ignore
    return (
        <div className="section">
            {props.children}
        </div>
    );
};

export const SectionTitle = props => {
    //prettier-ignore
    return (
        <div className="section__title">
            {props.children}
        </div>
    );
};

export const SectionBody = props => {
    //prettier-ignore
    return (
        <div className="section__body">
            {props.children}
        </div>
    );
};

export default Section;
