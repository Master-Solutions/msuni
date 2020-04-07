import React from 'react';

interface IDefaultLayoutProps {
    header?: React.ReactNode,
    footer?: React.ReactNode,
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = (props) => {
    return (
        <div>
            <div role="header">{props.header}</div>
            <div role="main">
                {props.children}
            </div>
            <div role="footer">{props.footer}</div>
        </div>
    )
};

export default DefaultLayout;