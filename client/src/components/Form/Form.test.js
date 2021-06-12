import React from "react";
import { render } from "@testing-library/react";

import Form from "./index";

describe("Form component", () => {
    test("It should render with pass props", () => {
        const { getByText, getByRole } = render(
            <Form formTitle={"Test Title"}>
                Form text and content
                <label htmlFor="test">Label test</label>
                <input type="text" id="test" />
            </Form>
        );

        getByText("Test Title");
        getByText("Form text and content");
        getByText("Label test");
        getByRole("separator");
        expect(getByRole("textbox").getAttribute("type")).toBe("text");
    });
});