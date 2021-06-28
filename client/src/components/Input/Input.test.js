import React from "react";
import { render } from "@testing-library/react";

import Input from "./index";

describe("Input component", () => {
    test("It renders with prop types and default required", () => {
        const { getByPlaceholderText } = render(
            <Input
                type={"text"}
                inputID={2}
                inputName={"JestTest"}
                placeholder="Jest placeholder text..."
            />
        );

        const input = getByPlaceholderText("Jest placeholder text...");

        expect(input.id).toBe("2");
        expect(input.type).toBe("text");
        expect(input.name).toBe("JestTest");
    });
});