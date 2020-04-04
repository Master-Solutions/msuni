import React from "react";
import {DefaultNamespace, ResourceInfo, ResourceManager, ResourceTypes} from "../src";
import {ComponentsRegistryAspectMixin} from "../src/aspects/ComponentsRegistryAspect";
import {Context, ResourceManagementAspectMixin} from "@uni/core";
import {render, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {Test} from "./Test";


describe('ComponentRegistryAspect', () => {

    class App extends ComponentsRegistryAspectMixin(ResourceManagementAspectMixin(Context)) {}

    let app;
    const id = "test";

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
            const withProps = (props = {}) => (C) => React.createElement(C, props);
            const ri = app.useComponent(id, Test, [withProps({name: "Yo"})]);

            expect(ri.options.hocs.length).toBe(1);
        });

    });

    describe('#getComponent', () => {

        it('can render registered component', () => {
            app.useComponent(id, Test);

            const {getByTestId } = render(<div data-testid="test"><Test /></div>);
            expect(getByTestId('test'))).toHaveTextContent('Test: default');
        });

    });
});