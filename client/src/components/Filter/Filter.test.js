import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Filter from "./index";

describe("Filter component for filtering store items", () => {
    test("It should render and allow selection of options", () => {
        const handleSelectChange = jest.fn();

        const { getByText, getByRole } = render(<Filter handleSelectChange={handleSelectChange} />);

        getByText("Filter By:");
        userEvent.selectOptions(getByRole("combobox"), ["priceLow"]);
        expect(getByRole("option", { name: "Price(Highest to Lowest)" }).selected).toBe(true);
    });
});