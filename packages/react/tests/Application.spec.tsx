import React from "react";
import {render, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {Test} from "./Test";
import {
    Provider,
    RComponent,
    Application
} from "../src";
import withProps from "../src/utils/withProps";


describe('Application', () => {
    let app;
    const id = "test";

    beforeEach(() => {
        app = new Application();
    });

    afterEach(cleanup);

    it('can render registered component',  () => {
        app.useComponent(id, Test);

        const { getByRole } = render(<Provider value={{app}}><RComponent id={id}/></Provider>);
        expect(getByRole('t')).toHaveTextContent('Test: default');
    });

    it('can render registered component with hoc',  () => {
        app.useComponent(id, Test, [withProps({name: 'Yo'})]);

        const { getByRole } = render(<Provider value={{app}}><RComponent id={id}/></Provider>);
        expect(getByRole('t')).toHaveTextContent('Test: Yo');
    });

    it('can render from root',  () => {
        app.useComponent('main', Test);
        const Root = app.buildRoot();

        const { getByRole } = render(Root);
        expect(getByRole('t')).toHaveTextContent('Test: default');
    });

    it('can render a custom layout based on default',  () => {
        app.useComponent(
            "layouts.mine",
            'layouts.default',
            [withProps({header: 'Yo, header!', children: "Yo, children!"})]
        );

        const Root = app.buildRoot('layouts.mine');

        const { getByRole } = render(Root);
        expect(getByRole('header')).toHaveTextContent('Yo, header!');
        expect(getByRole('main')).toHaveTextContent('Yo, children!');
    });

    it('can render a page with default layout',  () => {
        app.useComponent(id, Test);
        app.useComponent('test.main', id, [withProps({name: 'Main'})]);
        app.useComponent('test.footer', id, [withProps({name: 'Footer'})]);

        app.usePage({
            id: "page1",
            name: "My Page",
            widgets: [
                'test.main',
                {id: 'test.footer', region: 'footer'}
            ]
        });

        const Page = app.buildPage("page1");
        const Root = app.buildRootWithElement(<Page />);

        const { container, getByRole } = render(Root);
        // console.log(container.innerHTML);
        expect(getByRole('header')).toHaveTextContent('My Page');
        expect(getByRole('main')).toHaveTextContent('Test: Main');
        expect(getByRole('footer')).toHaveTextContent('Test: Footer');
    });

    it('can render page with router',  () => {
        app.useComponent(id, Test);
        app.useComponent('test.page', id, [withProps({name: 'Page content'})]);

        app.usePage({
            id: "page",
            name: "My Page" ,
            widgets: ['test.page']
        });

        app.useRoute({path: '/', page: "page"});

        const Root = app.buildRoot("routing.routes");

        const { container, getByRole } = render(Root);
        // console.log(container.innerHTML);
        expect(getByRole('header')).toHaveTextContent('My Page');
        expect(getByRole('main')).toHaveTextContent('Test: Page content');
    });


});