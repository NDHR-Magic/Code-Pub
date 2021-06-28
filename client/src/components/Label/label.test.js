import { render } from "@testing-library/react";

import Label from "./index";

describe("Label component", () => {
    test("It rendes with dynamic label and htmlFor property (aka for property in HTML)", () => {
        const { getByText } = render(<Label labelFor={"JestID"}>Jest Label</Label>);

        const label = getByText("Jest Label");
        expect(label.getAttribute("for")).toBe("JestID");
    });
});