import React from "react";
import {DefaultNamespace, ResourceTypes} from "../src";
import {ComponentsRegistryAspectMixin} from "../src/aspects/ComponentsRegistryAspect";
import {Context, ResourceManagementAspectMixin} from "@uni/core";
import {render, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {withProps} from "recompose";
import {Test} from "./Test";
import RComponent from "../src/components/RComponent";


describe('ComponentRegistryAspect', () => {

    class App extends ComponentsRegistryAspectMixin(ResourceManagementAspectMixin(Context)) {}

    let app;
    const id = "test";
    // const withProps = (props = {}) => (C) => React.createElement(C, props);

    beforeEach(() => {
        app = new App();
    });

    afterEach(cleanup);

    describe('#useComponent', () => {

        it('can register a component', () => {
            const ri = app.useComponent(id, Test);

            expect(ri.id).toBe(id);
            expect(ri.type).toBe(ResourceTypes.components);
            expect(ri.value).toBe(Test);
            expect(ri.ns).toBe(DefaultNamespace);
        });

        it('can register a component with namespace', () => {
            const ri = app.useComponent(id, Test, "yo");
            expect(ri.ns).toBe("yo");
        });

        it('can register a component with hoc', () => {
            const ri = app.useComponent(id, Test, [withProps({name: "Yo"})]);
            expect(ri.options.hocs.length).toBe(1);
        });

    });

    describe('#getComponent', () => {

        it('can get registered component',  () => {
            app.useComponent(id, Test);
            expect(app.getComponent(id)).toBe(Test);
        });

        it('can get registered component with hoc',  () => {
            app.useComponent(id, Test, [withProps({name: 'Yo'})]);
            const Component = app.getComponent(id);

            const { getByRole } = render(<Component />);
            expect(getByRole('t')).toHaveTextContent('Test: Yo');

        });

        // it('can render registered component',  () => {
        //     app.useComponent(id, Test);
        //
        //     const { getByRole } = render(<Provider value={app}><RComponent id={id}/></Provider>);
        //     expect(getByRole('t')).toHaveTextContent('Test: default');
        // });
        //
        // it('can render registered component with hoc',  () => {
        //     app.useComponent(id, Test, [withProps({name: 'Yo'})]);
        //
        //     const { getByRole } = render(<Provider value={app}><RComponent id={id}/></Provider>);
        //     expect(getByRole('t')).toHaveTextContent('Test: Yo');
        // });

    });
});