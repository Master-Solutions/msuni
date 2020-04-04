import React from 'react';

const Layout: React.FC<{}> = ({children}) => {

    return (
        <div>
            <div style={{border: "1px solid grey"}}>Header</div>
            <div  style={{border: "1px solid red"}}>
                {children}
            </div>
        </div>
    )
};

export default Layout;