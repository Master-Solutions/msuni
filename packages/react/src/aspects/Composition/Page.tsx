import React from 'react';
import useApp from "../../utils/useApp";
import {IPageProps} from "./PagesAspect";


const PageHeader = ({name}) => <h1>{name}</h1>;

const Page: React.FC<IPageProps> = (props) => {
    const {app} = useApp();

    const layout = props.layout || 'default';
    const Layout = app.getComponent(`layouts.${layout}`);

    const layoutProps = {
        header: <PageHeader name={props.name} />
    };

    props.widgets.forEach(w => {
        const id = typeof w === 'string' ? w : w.id;
        const region = typeof w === 'string' ? 'children' : w.region;
        if (!(region in layoutProps))
            layoutProps[region] = [];

        const Component = typeof w === 'string' ? app.getComponent(w) : app.getComponent(w.id);
        layoutProps[region].push(<Component key={id} />);
    });

    return <Layout {...layoutProps} />;
};

export default Page;