import React from 'react';
import {IPageProps} from "../aspects/PagesAndLayoutsAspect";
import useApp from "../utils/useApp";

const Page: React.FC<IPageProps> = (props) => {
    const {app} = useApp();

    const layout = props.layout || 'default';
    const Layout = app.getComponent(`layouts.${layout}`);

    const widgets = props.widgets.map(w => {
        const Component = app.getComponent(w);
        return <div key={w}><Component key={w} /></div>;
    });

    return (
        <Layout>
            <h1>{props.name}</h1>
            <div>{widgets}</div>
        </Layout>
    )
};

export default Page;