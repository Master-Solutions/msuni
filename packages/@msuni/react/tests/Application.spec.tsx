import React from "react";
import {Provider} from "../src";
import {ComponentsRegistryAspectMixin} from "../src/aspects/ComponentsRegistryAspect";
import {Context, ResourceManagementAspectMixin} from "@uni/core";
import {render, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {withProps} from "recompose";
import {Test} from "./Test";
import RComponent from "../src/components/RComponent";


describe('RComponent', () => {

    class App extends ComponentsRegistryAspectMixin(ResourceManagementAspectMixin(Context)) {}

    let app;
    const id = "test";

    beforeEach(() => {
        app = new App();
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
});