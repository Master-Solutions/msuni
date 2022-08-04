import React, { useState } from 'react';

const MenuContext = React.createContext({});

const Menu = ({children}) => {
	const [state, setState] = useState({});
	return <MenuContext.Provider value={state}>{children}</MenuContext.Provider>
};

Menu.Item = ({children}) => {
	return <div>{children}</div>
};
